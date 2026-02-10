from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import (
    Estoque, Venda, Atividade, DiarioBordo, RPD, LogPODDiario, Empresa, 
    Course, Lesson, WarRoomLog, DailyCourseActivity, Transaction, Goal
)
from .serializers import (
    EstoqueSerializer, VendaSerializer, AtividadeSerializer, DiarioBordoSerializer, 
    RPDSerializer, LogPODDiarioSerializer, CourseSerializer, LessonSerializer, 
    WarRoomLogSerializer, DailyCourseActivitySerializer, TransactionSerializer, GoalSerializer
)
from .pagination import CustomPageNumberPagination # Import CustomPageNumberPagination
from .permissions import IsOwnerOfCourse
from rest_framework.views import APIView # New import for APIView

import google.generativeai as genai
import os
from dotenv import load_dotenv

from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import (
    Estoque, Venda, Atividade, DiarioBordo, RPD, LogPODDiario, Empresa, 
    Course, Lesson, WarRoomLog, DailyCourseActivity, Transaction, Goal
)
from .serializers import (
    EstoqueSerializer, VendaSerializer, AtividadeSerializer, DiarioBordoSerializer, 
    RPDSerializer, LogPODDiarioSerializer, CourseSerializer, LessonSerializer, 
    WarRoomLogSerializer, DailyCourseActivitySerializer, TransactionSerializer, GoalSerializer
)
from .pagination import CustomPageNumberPagination
from .permissions import IsOwnerOfCourse
from rest_framework.views import APIView

import json
import datetime
from decimal import Decimal

load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../.env'))
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

class FinanceChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_message = request.data.get('question', '')
        if not user_message:
            return Response({"error": "No question provided"}, status=status.HTTP_400_BAD_REQUEST)

        api_keys = [os.environ.get(f'GEMINI_API_KEY{i}') for i in range(10)]
        api_keys = [key for key in api_keys if key] 

        if not api_keys:
            return Response({"error": "No GEMINI_API_KEY found in environment variables."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        ai_response_text = None
        last_error = None

        for key in api_keys:
            try:
                print(f"Attempting to use API Key ending in...{key[-4:]}")
                genai.configure(api_key=key)
                model = genai.GenerativeModel('gemini-2.5-flash')

                recent_transactions = Transaction.objects.filter(usuario=request.user).order_by('-date')[:10]
                transactions_context = "\n".join(
                    [f"- {t.date.strftime('%d/%m')}: {t.description} (R$ {t.amount})" for t in recent_transactions]
                )

                prompt = f"""
                Você é um assistente financeiro para o app FinançaIA. Sua tarefa é analisar a mensagem do usuário e os dados financeiros dele, e então responder de forma útil.

                **Dados Financeiros Recentes do Usuário:**
                {transactions_context if transactions_context else "Nenhuma transação recente."}

                **Mensagem do Usuário:**
                "{user_message}"

                **Sua Tarefa:**
                1.  **Analise a Intenção:** Qual a principal intenção do usuário? Escolha uma:
                    - `log_transaction`: O usuário está informando um gasto ou um ganho.
                    - `query_spending`: O usuário está perguntando sobre seus gastos ou ganhos.
                    - `ask_tip`: O usuário está pedindo um conselho financeiro.
                    - `general_greeting`: O usuário está apenas cumprimentando.

                2.  **Extraia as Entidades (se a intenção for 'log_transaction'):**
                    - `amount`: O valor numérico da transação.
                    - `description`: Uma breve descrição.
                    - `transaction_type`: 'receita' ou 'despesa'.
                    - `category`: Uma categoria como 'Mercado', 'Salário', 'Transporte', 'Lazer', 'Moradia', 'Alimentação', 'Outros'.

                3.  **Formate a Saída em JSON:** Responda APENAS com um objeto JSON com a seguinte estrutura. Não adicione nenhum texto ou formatação extra.
                    {{
                      "intent": "...",
                      "entities": {{
                        "amount": "<valor_numerico_ou_null>",
                        "description": "<descricao_ou_null>",
                        "transaction_type": "<receita_ou_despesa_ou_null>",
                        "category": "<categoria_ou_null>"
                      }},
                      "ai_response": "<uma resposta em linguagem natural para o usuário>"
                    }}
                """

                response = model.generate_content(prompt)
                ai_response_text = response.text
                
                print(f"Successfully got a response with key ...{key[-4:]}")
                break 

            except Exception as e:
                last_error = e
                print(f"API key ...{key[-4:]} failed. Error: {e}")
                continue
        
        if ai_response_text is None:
            print(f"All API keys failed. Last error: {last_error}")
            return Response({"error": "All AI API keys failed.", "details": str(last_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            cleaned_response_text = ai_response_text.strip().replace('```json', '').replace('```', '').strip()
            ai_data = json.loads(cleaned_response_text)

            intent = ai_data.get('intent')
            entities = ai_data.get('entities', {})
            ai_response_content = ai_data.get('ai_response', "I couldn't understand your request.")

            if intent == 'log_transaction' and entities.get('amount'):
                Transaction.objects.create(
                    usuario=request.user,
                    description=entities.get('description', 'Transação'),
                    amount=Decimal(str(entities['amount'])),
                    transaction_type=entities.get('transaction_type', 'despesa'),
                    category=entities.get('category', 'Outros'),
                    date=datetime.datetime.now()
                )

            return Response({
                "text_answer": ai_response_content,
                "visualization_type": "text",
                "data_points": []
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error processing AI response: {e}")
            print(f"Response text that caused error: {ai_response_text}")
            return Response({"error": "There was an error processing the AI's response."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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

    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = {'request': self.request}
        return super().get_serializer(*args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

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

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        return self.queryset.filter(usuario=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        return self.queryset.filter(usuario=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
