from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Estoque # Importa o modelo Estoque
# from api.models import Empresa, Atividade, Venda, DiarioBordo, RPD, LogPODDiario # Importe outros modelos se precisar


User = get_user_model()

class Command(BaseCommand):
    help = 'Verifica o status dos usuários cid@cdkteck.com e cid@cdkteck.com.br e seus itens de estoque.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Iniciando verificação de usuários e estoque...'))

        # 1. Verificar o usuário cid@cdkteck.com (o que o popular_banco criou com ID=1)
        user_cid_com = None
        try:
            user_cid_com = User.objects.get(email='cid@cdkteck.com')
            self.stdout.write(self.style.SUCCESS(f"Usuário cid@cdkteck.com (DB): ID={user_cid_com.id}, Superuser={user_cid_com.is_superuser}, Staff={user_cid_com.is_staff}"))
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR("ERRO: Usuário cid@cdkteck.com NÃO existe no banco de dados Django."))

        # 2. Verificar o usuário cid@cdkteck.com.br (o que vem do Firebase)
        user_cid_com_br = None
        try:
            user_cid_com_br = User.objects.get(email='cid@cdkteck.com.br')
            self.stdout.write(self.style.SUCCESS(f"Usuário cid@cdkteck.com.br (Firebase): ID={user_cid_com_br.id}, Superuser={user_cid_com_br.is_superuser}, Staff={user_cid_com_br.is_staff}"))
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR("AVISO: Usuário cid@cdkteck.com.br NÃO existe no banco de dados Django."))

        # 3. Analisar estoque para user_cid_com
        if user_cid_com:
            estoque_cid_com_count = Estoque.objects.filter(usuario=user_cid_com).count()
            self.stdout.write(f"Total de itens de estoque para cid@cdkteck.com (DB): {estoque_cid_com_count}")
            if estoque_cid_com_count > 0:
                self.stdout.write("  Primeiros 3 itens:")
                for item in Estoque.objects.filter(usuario=user_cid_com)[:3]:
                    self.stdout.write(f"  - {item.item} ({item.variacao})")
        
        # 4. Analisar estoque para user_cid_com.br
        if user_cid_com_br:
            estoque_cid_com_br_count = Estoque.objects.filter(usuario=user_cid_com_br).count()
            self.stdout.write(f"Total de itens de estoque para cid@cdkteck.com.br (Firebase): {estoque_cid_com_br_count}")
            if estoque_cid_com_br_count > 0:
                self.stdout.write("  Primeiros 3 itens:")
                for item in Estoque.objects.filter(usuario=user_cid_com_br)[:3]:
                    self.stdout.write(f"  - {item.item} ({item.variacao})")

        # 5. Sanity check: Total de itens de Estoque no sistema
        total_estoque_count = Estoque.objects.all().count()
        self.stdout.write(f"Total geral de itens de estoque no sistema: {total_estoque_count}")

        self.stdout.write(self.style.SUCCESS('Verificação concluída. Analise os IDs e a contagem de estoque para determinar a inconsistência.'))