from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Course
from django.db import transaction

User = get_user_model()

# Data provided by the user to update existing courses
COURSE_UPDATES = [
    {'id': 22, 'nome': 'Awesome Claude Skills', 'quantidade_horas': 0, 'progresso': None},
    {'id': 1, 'nome': 'Goal Mastery: 21 Days to Transform Your Life', 'quantidade_horas': 2, 'progresso': None},
    {'id': 2, 'nome': 'Machine Learning Foundations: Build Expert-Level AI Models', 'quantidade_horas': 17, 'progresso': 5},
    {'id': 4, 'nome': 'Google Antigravity for Beginners: AI Coding Crash Course', 'quantidade_horas': 12, 'progresso': 5},
    {'id': 6, 'nome': 'Build 8 Python Apps Games and Web Application Python Master', 'quantidade_horas': 6, 'progresso': 5},
    {'id': 21, 'nome': 'Generative AI for Personal Productivity: Get More Done', 'quantidade_horas': 23, 'progresso': None},
    {'id': 3, 'nome': 'From Prompt Engineering to Agent Engineering', 'quantidade_horas': 32, 'progresso': None},
    {'id': 8, 'nome': 'DeepSeek R1 AI: 25 Real World Projects', 'quantidade_horas': 6, 'progresso': 5},
    {'id': 10, 'nome': 'Complete RAG Bootcamp: Build & Deploy AI Apps', 'quantidade_horas': 6, 'progresso': 5, 'link': 'https://www.udemy.com/course/complete-rag-bootcamp-build-optimize-and-deploy-ai-apps/learn/lecture/53141979'},
    {'id': 9, 'nome': '100 AI Agents in 100 Days 2026', 'quantidade_horas': 8, 'progresso': None, 'link': 'https://www.udemy.com/course/100-ai-agents/learn/lecture/54073525'},
    {'id': 19, 'nome': 'CAIXA Inteligência Artificial na Prática (DIO)', 'quantidade_horas': 21, 'progresso': None, 'link': 'https://web.dio.me/track/1bc613d3-f11b-4a46-8628-7551d3987274'},
    {'id': 5, 'nome': 'AI-Powered Microservices with Vibe Coding', 'quantidade_horas': 2, 'progresso': None, 'link': 'https://www.udemy.com/course/ai_powered_microservices_with_vibe_coding/learn/lecture/9749828'},
    {'id': 7, 'nome': 'Complete AI Agent Practical Course C| AIPC', 'quantidade_horas': 8, 'progresso': None, 'link': 'https://www.udemy.com/course/complete-ai-agent-practical-course-c-aipc/learn/lecture/52990311'},
    {'id': 12, 'nome': 'Mastering Agentic Design Patterns', 'quantidade_horas': 5, 'progresso': 5, 'link': 'https://www.udemy.com/course/mastering-agentic-design-patterns/learn/lecture/47669089'},
    {'id': 15, 'nome': 'Base44 Mastery: Build Enterprise AI Workflow Automations', 'quantidade_horas': 7, 'progresso': None, 'link': 'https://www.udemy.com/course/base44-mastery-build-enterprise-ai-workflow-automations/learn/lecture/53868305'},
    {'id': 16, 'nome': 'Ultimate DevOps to MLOps Bootcamp', 'quantidade_horas': 11, 'progresso': 5, 'link': 'https://www.udemy.com/course/devops-to-mlops-bootcamp/learn/lecture/49728339'},
    {'id': 17, 'nome': 'Build On-Device AI', 'quantidade_horas': 2, 'progresso': None, 'link': 'https://www.udemy.com/course/build-on-device-ai/learn/lecture/48829935'},
    {'id': 11, 'nome': 'Quantization for GenAI Models', 'quantidade_horas': 2, 'progresso': 5, 'link': 'https://www.udemy.com/course/quantization/learn/lecture/46509979'},
    {'id': 13, 'nome': 'Certified Generative AI Architect with Knowledge Graphs', 'quantidade_horas': 2, 'progresso': None, 'link': 'https://www.udemy.com/course/certified_generative_ai_architect_with_knowledge_graphs/learn/lecture/9616386'},
    {'id': 14, 'nome': 'AI Agents: From Foundations to Enterprise Systems', 'quantidade_horas': 11, 'progresso': 5, 'link': 'https://www.udemy.com/course/ai-agents-from-foundations-to-enterprise-systems/learn/lecture/54061297'},
    {'id': 23, 'nome': 'Google Cloud Generative AI Leader Ultimate Course 2026', 'quantidade_horas': 2, 'progresso': None, 'link': 'https://www.udemy.com/course/google-cloud-generative-ai-leader-certification-course/learn/lecture/52791451'},
    {'id': 18, 'nome': 'Certified Chief AI Officer Program', 'quantidade_horas': 20, 'progresso': None, 'link': 'https://www.udemy.com/course/chief-ai-officer-program-lead-ai-strategy-governance/learn/lecture/50444805'},
    {'id': 20, 'nome': 'AI for Risk Management & Compliance Excellence', 'quantidade_horas': 5, 'progresso': 5, 'link': 'https://www.udemy.com/course/ai-for-risk-management-compliance-excellence/learn/lecture/50961515'},
]

class Command(BaseCommand):
    help = 'Atualiza cursos existentes com informações de horas e links a partir de uma lista.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Iniciando atualização de cursos...'))

        user_owner = None
        try:
            user_owner = User.objects.get(email='cid@cdkteck.com.br')
            self.stdout.write(self.style.SUCCESS(f"Usuário proprietário '{user_owner.email}' encontrado."))
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR("ERRO: Usuário 'cid@cdkteck.com.br' NÃO encontrado. Crie este usuário antes de rodar o script."))
            return

        updated_count = 0
        not_found_count = 0
        with transaction.atomic():
            for course_data in COURSE_UPDATES:
                course_id = course_data['id']
                try:
                    course = Course.objects.get(id=course_id, usuario=user_owner)
                    
                    course.quantidade_horas = course_data.get('quantidade_horas', course.quantidade_horas)
                    
                    if course_data.get('link'):
                        course.link = course_data['link']
                    
                    if course_data.get('progresso') is not None:
                        course.progresso = course_data['progresso']
                        
                    course.save()
                    
                    self.stdout.write(self.style.SUCCESS(f"Curso ID {course_id} ('{course.nome}') atualizado."))
                    updated_count += 1

                except Course.DoesNotExist:
                    self.stdout.write(self.style.WARNING(f"AVISO: Curso com ID {course_id} não encontrado para o usuário '{user_owner.email}'."))
                    not_found_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'\nAtualização de cursos concluída!'))
        self.stdout.write(f'  - {updated_count} cursos atualizados.')
        self.stdout.write(f'  - {not_found_count} cursos não encontrados.')
