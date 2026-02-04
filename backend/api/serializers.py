from rest_framework import serializers
from .models import Usuario, Estoque, Venda, Atividade, DiarioBordo, RPD, LogPODDiario, Course, Lesson, WarRoomLog, DailyCourseActivity # Import Course and Lesson and DailyCourseActivity

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'email', 'tipo_usuario', 'is_staff'] # Add other fields as needed

class EstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estoque
        fields = '__all__'
        read_only_fields = ['usuario', 'data_cadastro', 'ultima_atualizacao'] # User is set by the view

class VendaSerializer(serializers.ModelSerializer):
    estoque_item_display = serializers.CharField(source='estoque_item.__str__', read_only=True)

    class Meta:
        model = Venda
        fields = '__all__'
        read_only_fields = ['usuario', 'preco_unitario', 'preco_total', 'data_venda'] # These are calculated or set by the backend

class AtividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        fields = '__all__'
        read_only_fields = ['usuario', 'data_cadastro']

class DiarioBordoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiarioBordo
        fields = '__all__'
        read_only_fields = ['usuario', 'data_registro']

class RPDSerializer(serializers.ModelSerializer):
    class Meta:
        model = RPD
        fields = '__all__'
        read_only_fields = ['usuario', 'data_registro']

class LogPODDiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogPODDiario
        fields = '__all__'
        read_only_fields = ['usuario', 'data_registro']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'course', 'data_aula', 'topicos_abordados', 'observacoes', 'concluida', 'duracao_minutos', 'data_criacao', 'ultima_atualizacao']
        read_only_fields = ['data_criacao', 'ultima_atualizacao']
        # Tornar o campo 'course' opcional para criação aninhada
        extra_kwargs = {
            'course': {'required': False, 'allow_null': True}
        }

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, required=False)

    class Meta:
        model = Course
        fields = [
            'id', 'usuario', 'nome', 'descricao', 'progresso', 'quantidade_horas',
            'status', 'priority', 'link', 'data_inicio', 'data_conclusao_prevista',
            'data_conclusao_real', 'data_criacao', 'ultima_atualizacao', 'lessons'
        ]
        read_only_fields = ['usuario', 'data_criacao', 'ultima_atualizacao']


class WarRoomLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WarRoomLog
        fields = '__all__'
        read_only_fields = ['usuario', 'data_registro']


class DailyCourseActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyCourseActivity
        fields = '__all__'
        read_only_fields = ['data_registro']
