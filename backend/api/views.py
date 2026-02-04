from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Estoque, Venda, Atividade, DiarioBordo, RPD, LogPODDiario, Empresa, Course, Lesson, WarRoomLog, DailyCourseActivity
from .serializers import EstoqueSerializer, VendaSerializer, AtividadeSerializer, DiarioBordoSerializer, RPDSerializer, LogPODDiarioSerializer, CourseSerializer, LessonSerializer, WarRoomLogSerializer, DailyCourseActivitySerializer
from .pagination import CustomPageNumberPagination # Import CustomPageNumberPagination
from .permissions import IsOwnerOfCourse
from rest_framework.views import APIView # New import for APIView

# ... (existing ViewSets)

class ChatAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_message = request.data.get('question', '')
        # For now, a simple fixed response
        response_content = f"Recebi sua pergunta: '{user_message}'. Estou processando..."
        
        return Response({
            "text_answer": response_content,
            "visualization_type": "text",
            "data_points": []
        }, status=status.HTTP_200_OK)

class EstoqueViewSet(viewsets.ModelViewSet):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination # Add pagination_class

    def get_queryset(self):
        # Ensure a user can only see and manage their own stock items
        return self.queryset.filter(usuario=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class VendaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure a user can only see and manage their own sales
        return self.queryset.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user for the new sale
        venda = serializer.save(usuario=self.request.user)

        # Decrement stock quantity
        estoque_item = venda.estoque_item
        if estoque_item.quantidade >= venda.quantidade:
            estoque_item.quantidade -= venda.quantidade
            estoque_item.save()
        else:
            # Handle insufficient stock (e.g., raise an error)
            raise serializers.ValidationError("Quantidade em estoque insuficiente.")

class AtividadeViewSet(viewsets.ModelViewSet):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination # Add pagination_class here

    def get_queryset(self):
        # Ensure a user can only see and manage their own activities
        return self.queryset.filter(usuario=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class DiarioBordoViewSet(viewsets.ModelViewSet):
    queryset = DiarioBordo.objects.all()
    serializer_class = DiarioBordoSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination # Add pagination_class here

    def get_queryset(self):
        return self.queryset.filter(usuario=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class RPDViewSet(viewsets.ModelViewSet):
    queryset = RPD.objects.all()
    serializer_class = RPDSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination # Add pagination_class here

    def get_queryset(self):
        return self.queryset.filter(usuario=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class LogPODDiarioViewSet(viewsets.ModelViewSet):
    queryset = LogPODDiario.objects.all()
    serializer_class = LogPODDiarioSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination # Add pagination_class here

    def get_queryset(self):
        return self.queryset.filter(usuario=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(usuario=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        lessons_data = serializer.validated_data.pop('lessons', [])
        
        # Atribui o usuário atual ao criar o curso
        course = serializer.save(usuario=request.user)
        
        for lesson_data in lessons_data:
            Lesson.objects.create(course=course, **lesson_data)
            
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        lessons_data = serializer.validated_data.pop('lessons', None)

        # Atualiza a instância do curso
        self.perform_update(serializer)

        if lessons_data is not None:
            # Mapeia as lessons existentes por ID para fácil acesso
            existing_lessons = {lesson.id: lesson for lesson in instance.lessons.all()}
            
            # Ids das lessons que vieram na requisição
            request_lesson_ids = {item.get('id') for item in lessons_data if item.get('id')}

            # Atualiza ou cria lessons
            for lesson_data in lessons_data:
                lesson_id = lesson_data.get('id', None)
                if lesson_id:
                    lesson = existing_lessons.get(lesson_id, None)
                    if lesson:
                        # Atualiza a lesson existente
                        for key, value in lesson_data.items():
                            setattr(lesson, key, value)
                        lesson.save()
                else:
                    # Cria uma nova lesson se não tiver ID
                    Lesson.objects.create(course=instance, **lesson_data)
            
            # Deleta lessons que não estão na requisição
            for lesson_id, lesson in existing_lessons.items():
                if lesson_id not in request_lesson_ids:
                    lesson.delete()

        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def recalculate_progress(self, request, pk=None):
        """
        Recalculates the progress of a course based on its completed lessons.
        """
        course = self.get_object()
        
        # Calculate the total duration of completed lessons
        total_minutes = sum(lesson.duracao_minutos for lesson in course.lessons.filter(concluida=True))
        
        # Update the course progress
        course.progresso = total_minutes
        course.save()
        
        # Serialize and return the updated course data
        serializer = self.get_serializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated, IsOwnerOfCourse]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        # Lessons should be filtered by the current user's courses
        return self.queryset.filter(course__usuario=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        # Ensure the course being referenced belongs to the current user
        # This assumes 'course' is passed in the request data
        course_id = self.request.data.get('course')
        try:
            course = Course.objects.get(id=course_id, usuario=self.request.user)
            serializer.save(course=course)
        except Course.DoesNotExist:
            raise serializers.ValidationError("Course not found or does not belong to the current user.")


class WarRoomLogViewSet(viewsets.ModelViewSet):
    queryset = WarRoomLog.objects.all()
    serializer_class = WarRoomLogSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        # Ensure a user can only see and manage their own war room logs
        return self.queryset.filter(usuario=self.request.user).order_by("-date")

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class DailyCourseActivityViewSet(viewsets.ModelViewSet):
    queryset = DailyCourseActivity.objects.all()
    serializer_class = DailyCourseActivitySerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        # Ensure a user can only see daily activities for their own courses
        return self.queryset.filter(course__usuario=self.request.user).order_by("-date")

    def perform_create(self, serializer):
        # Ensure the course being referenced belongs to the current user
        course_id = self.request.data.get('course')
        try:
            course = Course.objects.get(id=course_id, usuario=self.request.user)
            serializer.save(course=course)
        except Course.DoesNotExist:
            raise serializers.ValidationError("Course not found or does not belong to the current user.")