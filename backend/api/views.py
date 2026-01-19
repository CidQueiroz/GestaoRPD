from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Estoque, Venda, Atividade, DiarioBordo, RPD, LogPODDiario, Empresa, Course, Lesson # Import Course and Lesson
from .serializers import EstoqueSerializer, VendaSerializer, AtividadeSerializer, DiarioBordoSerializer, RPDSerializer, LogPODDiarioSerializer, CourseSerializer, LessonSerializer # Import new Serializers
from .pagination import CustomPageNumberPagination # Import CustomPageNumberPagination

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

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]
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