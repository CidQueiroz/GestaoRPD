from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Empresa, Atividade, Estoque, Venda, DiarioBordo, RPD, LogPODDiario
from django.utils.dateparse import parse_datetime
from django.db import transaction
from django.utils import timezone # Importar timezone
import os

User = get_user_model()

# Helper function to make naive datetimes timezone-aware (UTC)
def make_aware_if_naive(dt):
    if dt and timezone.is_naive(dt):
        return timezone.make_aware(dt, timezone.get_default_timezone())
    return dt

class Command(BaseCommand):
    help = 'Popula o banco Oracle com dados legados do MySQL'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Iniciando migração de dados...'))

        # Usamos transaction.atomic para garantir que ou entra tudo ou não entra nada
        with transaction.atomic():
            
            # 1. EMPRESAS
            empresa, created = Empresa.objects.get_or_create(
                nome_empresa='CDK TECK',
                defaults={'id': 1}
            )
            self.stdout.write(f'Empresa processada: {empresa.nome_empresa}')

            # 2. USUARIOS
            usuarios_data = [
                {'id': 1, 'usuario_mysql': 'cid', 'nome': 'Cidirclay Queiroz', 'is_staff_mysql': 1},
                {'id': 2, 'usuario_mysql': 'cleo', 'nome': 'Cleópatra Santos', 'is_staff_mysql': 1},
                {'id': 3, 'usuario_mysql': 'quiopa', 'nome': 'Cleópatra Lima', 'is_staff_mysql': 0},
                {'id': 4, 'usuario_mysql': 'zanah', 'nome': 'Hozanah Lima', 'is_staff_mysql': 0},
                {'id': 46, 'usuario_mysql': 'Mayque', 'nome': 'Mayquinho Malvadao', 'is_staff_mysql': 0},
            ]

            user_map = {} 

            for u_data in usuarios_data:
                email = f"{u_data['usuario_mysql']}@cdkteck.com"
                
                user, created = User.objects.get_or_create(
                    email=email,
                    defaults={
                        'is_active': True,
                        'is_staff': bool(u_data['is_staff_mysql']),
                        'tipo_usuario': 'Administrador' if bool(u_data['is_staff_mysql']) else 'Cliente',
                    }
                )
                if created:
                    user.set_password('Mudar123!') 
                    user.save()
                
                user_map[u_data['id']] = user
            
            self.stdout.write('Usuários processados.')

            # 3. ATIVIDADES
            atividades_data = [
                (1, "Missão 'Explicador': Dedicar 1 hora de suporte nos estudos/deveres das gêmeas.", 'tarde', 1, 1),
                (2, "Ativação: Beber 1 copo d'água cheio ao acordar.", 'manha', 1, 1),
                (3, "Calibração: Fazer 5 minutos de respiração guiada", 'manha', 1, 1),
                (4, "Curso DBT", 'manha', 1, 1),
                (5, "Logística Escolar: Buscar as gêmeas na escola.", 'tarde', 1, 1),
                (6, "Logística Terapêutica: Levar as gêmeas para suas terapias/actividades.", 'tarde', 1, 1),
                (7, "Marcar o 'x' no seu 'D.Bordo' para a AMV de estudo que você fez pela manhã.", 'noite', 1, 1),
                (8, "ORACLE NEXT EDUCATION", 'manha', 1, 1),
                (9, "Operações Domésticas: Executar 1 tarefa doméstica", 'tarde', 1, 1),
                (10, "Planejamento: Definir qual será a tarefa de estudo de amanhã", 'noite', 1, 1),
                (11, "Programação", 'manha', 1, 1),
                (12, "Projeto 'Caça-Preço': Executar 1 bloco de 25 minutos de programação (Manhã)", 'manha', 1, 1),
                (13, "Projeto 'Caça-Preço': Executar 1 bloco de 25 minutos de programação (Noite)", 'noite', 1, 1),
                (14, "Tarefa Doméstica", 'manha', 0, 1),
                (15, "Treinamento Principal: Executar 1 bloco de 25 minutos", 'manha', 1, 1),
                (16, "preencher 1 RPD com a 'Resposta Adaptativa'. Se não houve, pule esta etapa.", 'noite', 1, 1),
            ]

            atividade_map = {}

            for atv_id, nome, periodo, ativa, user_fk in atividades_data:
                dono = user_map.get(user_fk)
                if not dono: 
                    self.stdout.write(self.style.WARNING(f"Usuário com FK {user_fk} não encontrado para atividade '{nome}'. Pulando."))
                    continue

                atv, _ = Atividade.objects.get_or_create(
                    nome_atividade=nome,
                    usuario=dono, 
                    defaults={
                        'periodo': periodo,
                        'ativa': bool(ativa)
                    }
                )
                atividade_map[atv_id] = atv
            
            self.stdout.write('Atividades processadas.')

            # 4. ESTOQUE
            estoque_data = [
                (1,'Camisa','Flamengo',2,10.00), (2,'Cachorro','Laranja',4,5.00), (3,'Pulseira','Jade',2,10.00),
                (4,'Laço','pacotinho c/ 10',2,4.00), (5,'Camisa','Vasco',2,10.00), (6,'Camisa','Palmeiras',1,10.00),
                (7,'Cachorro','Rosa Transparente',3,5.00), (8,'Cachorro','Rosa Bolinha',1,5.00), (9,'Cachorro','Rosa Claro',2,5.00),
                (10,'Cachorro','Marfim',2,5.00), (11,'Cachorro','Perola',4,5.00), (12,'Cachorro','Verde',4,5.00),
                (13,'Camisa','Botafogo',3,10.00), (14,'Brincos','Azul (Alegria - Amor)',0,2.00), (15,'Brincos','Rosa (Benção)',1,2.00),
                (16,'Prendedor','Celular',1,10.00), (17,'Camisa','Flamengo - Rosa',1,10.00), (18,'Garrafa','Rosa',1,10.00),
                (19,'Garrafa','Azul',1,10.00), (20,'Cachorrão','Colorido',1,10.00), (21,'Cachorro','Marrom pequeno',2,5.00),
                (22,'Cachorro','Azul bolinha',1,5.00), (23,'Pulseira','Amarela-Marrom',1,5.00), (24,'Pulseira','Amarela',1,5.00),
                (25,'Brincos','Branco',1,5.00), (26,'Brincos','Verde',0,5.00), (27,'Pulseira','Branca',2,5.00),
                (28,'Pulseira','Azul',3,5.00), (29,'Colar','Capivara',1,10.00), (30,'Colar','Coração Colorido',1,10.00),
                (31,'Colar','Transparente',1,10.00), (32,'Brincos','Marrom-madeira',1,5.00), (33,'Pulseira','Branca-Rosa-Laranja',1,5.00),
                (34,'Pulseira','Vermelha-Prata',1,5.00), (35,'Pulseira','Colorido',1,5.00), (36,'Pulseira','Bolinha Colorida',2,5.00),
                (37,'Pulseira','Bolinha Azul',1,5.00), (38,'Conjunto','Verde',1,15.00), (39,'Camisa','Fluminense',1,10.00),
                (40,'Prendedor','Chiquinha c/ nome',1,15.00), (41,'Prendedor','Chiquinha s/ nome',1,10.00), (42,'Prendedor','Pingente',1,5.00),
                (43,'Pulseira','Lacinho',1,5.00), (44,'Pulseira','Borboleta-flor-mão',1,5.00), (45,'Pulseira','Golfinho coração',1,5.00),
                (46,'Cachorro','Vermelho',1,5.00), (47,'Prendedor','Xuxinha bolinha',3,0.50)
            ]

            for old_id, item_nome, variacao, qtd, preco in estoque_data:
                dono_estoque = user_map.get(1) 
                if not dono_estoque:
                    self.stdout.write(self.style.WARNING(f"Usuário padrão para Estoque não encontrado. Pulando item '{item_nome}'."))
                    continue

                Estoque.objects.get_or_create(
                    item=item_nome,
                    variacao=variacao if variacao else '', 
                    defaults={
                        'quantidade': qtd,
                        'preco': preco,
                        'empresa': empresa, 
                        'usuario': dono_estoque
                    }
                )
            self.stdout.write('Estoque processado.')

            # 5. DIARIO_BORDO
            diario_bordo_data = [
                (17,'2025-08-11 00:00:00',1,4), (18,'2025-08-11 00:00:00',1,14), (19,'2025-08-12 00:00:00',1,11),
                (20,'2025-08-12 00:00:00',1,14), (21,'2025-08-15 00:00:00',1,11), (22,'2025-08-15 00:00:00',1,14),
                (23,'2025-08-17 00:00:00',1,4), (24,'2025-08-17 00:00:00',1,14), (25,'2025-08-20 00:00:00',1,11),
                (26,'2025-08-21 00:00:00',1,11), (27,'2025-08-21 00:00:00',1,8), (28,'2025-08-21 00:00:00',1,14),
                (29,'2025-08-22 00:00:00',1,8), (30,'2025-08-22 00:00:00',1,11), (31,'2025-08-23 00:00:00',1,4),
                (32,'2025-08-23 00:00:00',1,11)
            ]

            for old_id, data_str, user_fk, atv_fk in diario_bordo_data:
                dono = user_map.get(user_fk)
                atividade = atividade_map.get(atv_fk)
                if not dono or not atividade:
                    self.stdout.write(self.style.WARNING(f"Usuário ou Atividade FK não encontrado para diario_bordo ID {old_id}. Pulando."))
                    continue

                DiarioBordo.objects.get_or_create(
                    data=make_aware_if_naive(parse_datetime(data_str)), 
                    usuario=dono,
                    atividade=atividade
                )
            self.stdout.write('Diário de Bordo processado.')

            # 6. RPD (respostas)
            rpd_data = [
                (22,'2025-05-16 19:45:13','Minha mae me pediu ajuda para colocar algumas lampadas e eu perguntei "agora" entao ela disse "deixa".','Ela entendeu como má vontade minha.','Frustrado 50','ela estava certa 100','Eu devia ter ido fazer logo, pois fui meio preguiçoso',1),
                (23,'2025-05-17 08:41:10','Gemeas se alarmando pq o Mayque passou na frente de um carro (e por qualquer coisa)','frescura e drama delas','raiva, irritação 80','elas tem um problema de saude','Eu devia ser mais paciente com elas e entender melhor a condição delas',1),
                (24,'2025-05-18 10:05:25','minha mae me pede algo e não consigo ter tempo para as minhas as coisas','ela faz de proposito','irritação, preguiça 60','ela é energica, mas não tem a mesma saude q antes','preciso conversar com ela pra alinhar uns pontos',1),
                (25,'2025-05-26 07:47:07','uma menina sentou do meu lado no onibus','puxar assunto','timidez, vergonha 100','eu não sabia qual era a dela e so poderia saber conversando','eu podia ter falado qq coisa pra quebrar o gelo ou descobrir algo',1),
                (26,'2025-05-27 14:37:37','Fui na casa da minha mae e ela mal me respondeu e saiu com as meninas.','q eu tinha feito algo errado (90)','preocupação pra descobrir oq eu teria feito (50).','ela pode estar com pressa, pode estar zangada com as meninas.','alivio por ficar em casa sozinho (50)',1),
                (27,'2025-05-31 18:48:50','Hozanah perdeu o cartao de passagem e de identificação pois estava andando na rua de brincadeira. briguei muito com ela e com Cleópatra tbm.','elas sao inconsequentes e so fazem merda (50-50)','raiva 50 irritação 50','elas são crianças e é normal se comportarem assim e eventualmente aprontarem. 100','(50-50) Continuo achando q elas são assim, porém tentarei ser mais tolerante e brigar de forma menos efusiva.',1),
                (28,'2025-05-31 23:58:32','Liguei para minha filha as 14h e ela não atendeu. Depois tentei novamente às 20h.','Meu primeiro pensamento foi que a mãe dela desligou o celular para que eu não falasse com minha filha.','Fiquei chateado (60), enciumado (30), irritado (10).','De repente o telefone descarregou ou estava sem rede. (20)','Ela pode ou não ter feito de propósito, e eu tenho que dar o benefício do dívida e não sofrer por algo que não sei. 100',1),
                (29,'2025-06-02 14:13:07','me senti mal durante o final de semana (01/06), minha mae e as gemeas vieram passar o dia aqui','nao queria ninguem aqui perto, eu estava me sentindo mal e so queria ficar quietinho','tristeza por nao poder dizer nao pra elas, frustração (80)','elas estavam querendo me ajudar (100)','aceitar a ajuda delas',1),
                (30,'2025-06-02 23:59:33','Uma amiga muito próxima postou no story do WhatsApp que sente saudade do casamento e daria tudo pra voltar ao que era antes','Senti empatia e queria o mesmo','Tristeza por ela e por mim, 90','Não podemos voltar ao passado, mas ainda podemos escrever o futuro. 50','Continuo com o mesmo pensamento, porém crendo que no futuro minha mente vai mudar',1),
                (31,'2025-06-05 03:36:59','Lembro de um fato de presenciar uma luta entre Brock Lesnar vs Frank Mir, onde o primeiro nocauteou o segundo com ferocidade','Penso que não é na minha natureza agredir alguém ou que seria incapaz de acertar um soco na face de alguém. E isso me torna fraco perante as mulheres e incapaz de fornecer proteção que elas procuram','Frustração, impotência, Inferioridade, Preocupação, Vergonha, Tristeza, Medo','Força física não está necessariamente ligada a proteção. Existe outras formas de proteger sem precisar agredir ninguém.','Preciso entender que comando por voz, presença, inteligência são e podem ser mais eficazes do que força bruta.',1),
                (32,'2025-06-05 03:39:32','As gêmeas não conseguem fazer absolutamente nada sem instrução','Se vira, porra','Tédio, irritação 80','Elas são constantemente polidas pela minha mãe que as impede de fazer muita coisa e ficam com medo de quem errado','Mais paciência. Ninguém nasce sabendo e elas vão aprender com o tempo.',1),
                (33,'2025-06-06 14:00:13','eu sempre coloco roupa pra lavar na maquina aqui de casa. FDS minha mae veio e colocou roupa pra lavar. Durante a semana, eu fui colocar e percebi que o cano estava quebrado e vazou agua pela casa toda;','que minha mae quebrou e nao falou nada (uma evidencia é que tinha umna garrafa em cima do cano que parecia cumprir o papel de estancar o vazamento)','raiva 80','minha mae pode nao ter visto ou ter tentado consertar sem me preocupar.','Vou tentar consertar e conversar com ela para me avisar, de modo que eu nao seja pego desprevinido posteriormente',1),
                (34,'2025-06-07 10:35:15','A mãe da minha filha aceitou que a gente se visse o combinado era que eu fosse entrar na fila para poder pegar voucher para andarmos de balão acontece que estava muito cheio não conseguimos o voucher e o balão subia muito baixo','Meu primeiro pensamento foi de que ela fez de propósito para eu perder tempo nessa fila e ficar menos tempo com minha filha','Frustração, irritação, vergonha. Medo','O evento estar cheio não é culpa dela, o balão não subir tanto quanto eu imaginei também não é culpa dela','Ainda permaneceu a frustração e a irritação pelo tempo perdido porém eu sei que a culpa não é dela e não acredito que ela tenha feito de propósito tentar redirecionar esse essa frustração para outra oportunidade de encontro',1),
                (35,'2025-08-13 08:02:48','Minha mae mexendo no encanamento da piscina','que ela estava inventando historia e trabalho era inutil','raiva e irritação (50)','Que eu deveria dar o espaço dela e deixar ela fazer do jeito que está acostumada','Retirado',1),
                (36,'2025-08-13 09:07:13','cleopatra passando o dia inteiro para arrumar o quarto, desde 10h ate meia noite','pois ela tem tempo e fica miando (chorando) e enrolando e acaba nao fazendo','extrema irritação','Que eu devo ser compreensivo e ajudá-la para que ela consiga concluir a tarefa','Retirado',1),
                (37,'2025-08-15 10:42:02','minha mae saiu com meu cachorro, mayque, pra rua e ele quase foi atropelado. eu pedi pra q ela nao saisse mais com ele pela manhã sem mim e ela nao gostou. disse q nao cuidaria mais dele','que ela está sendo infantil. respondi com raiva e ignorando','irritação, raiva, grosseria','ter explicado com mais calma, ou pedido para que ela tomasse mais cuidado com ele na rua, aproveitando pra explicar o comportamento dele','Retirado',1),
                (38,'2025-08-18 12:44:26','minha mae reclamando do mayque, sendo que ela tá com ele ha 3 anos e agora ta com essa.','que ela está fazendo pra implicar e está com raiva querendo ter a razão','raiva e angustia','assumir a responsabilidade pelo cachorro e não discutir com ela.','Retirado',1),
                (39,'2025-08-20 23:59:22','Vi a moça hoje, tive a oportunidade de falar, mas congelei e não fiz nada.','"Eu não consigo", "Foi vergonhoso", "Perdi a oportunidade".','Vergonha, frustração, raiva de mim mesmo','O padrão de congelamento de décadas foi ativado. Isso era esperado. A missão não falhou; ela apenas revelou o nível de resistência do inimigo. A vitória de hoje não era falar com ela, mas sim analisar por que não falei. A próxima tentativa será mais informada.','Retirado',1),
                (40,'2025-08-24 14:19:26','Minha mãe foi pra igreja no domingo de manhã e combinou comigo que iríamos na outra casa resolver uns problemas que tem lá. Ela foi pra igreja e depois voltou pra casa sem me escutar e eu fui na outra casa sozinho','Ela muda de ideia o tempo todo e sem avisar conforme a vontade dele','Frustração, desconforto','Conversar com tua e explicar a importância de ser avisado antes das mudanças de plano ou explicar a importância de seguir o combinado','Retirado',1),
                (41,'2025-08-31 14:02:50','Hoje eu vi três casais no mercado que tinha o mesmo perfil a menina era muito bonita e o homem era esquisito gordo ou feio ou estranho','Meu primeiro pensamento foi de porque eles conseguem e eu não consigo estou sozinho há um ano','Frustração tristeza desânimo baixa autoestima','Pensei que eu também consigo que um dia isso vai acontecer comigo','Retirado',1),
                (42,'2025-09-01 10:17:44','Hoje eu fui tirar uma xerox e na loja a atendente era muito simpática e estávamos conversando naturalmente eu tentando ser simpático também e quanto percebia eu comecei a falar que não entendia o fato de em 2025 ainda pedirem foto 3 por 4 entretanto nesse momento eu percebi que eu estava em uma loja que tirava foto 3 por 4 e fazia impressões, fiquei em silêncio imediatamente e ficou um clima meio estranho pelo que eu tinha acabado de falar','Eu pensei imediatamente que eu era burro e que não sabia me comunicar só falo merda','Vergonha','Eu deveria ter mudado de assunto e agir como se nada tivesse acontecido porque esse tipo de coisa acontece com qualquer um','Retirado',1),
                (44,'2025-09-08 19:40:59','dei match com uma menina do espirito santo','nao vao dar em nada','frustração','Não prevejo o futuro. de repente, é uma oportunidade de trabalhar minha comunicação.','Retirado',1),
                (59,'2025-09-09 09:14:07','acordei cansada','nao vou sair da cama','preguiça','preciso me movimentoar','Retirado',2),
                (60,'2025-09-09 09:20:47','acordei com cansada','nao quero sair da cama','preguiça','preciso ir pra escola','Retirado',3) 
            ]

            for old_id, data_hora_str, situacao, pensamento, emocao, conclusao, resultado, user_fk in rpd_data:
                dono = user_map.get(user_fk)
                if not dono: 
                    self.stdout.write(self.style.WARNING(f"Usuário FK não encontrado para RPD ID {old_id}. Pulando."))
                    continue
                
                RPD.objects.get_or_create(
                    data=make_aware_if_naive(parse_datetime(data_hora_str)),
                    usuario=dono,
                    defaults={
                        'situacao': situacao,
                        'pensamento_automatico': pensamento,
                        'emocao': emocao,
                        'resposta_adaptativa': conclusao,
                        'resultado': resultado,
                    }
                )
            self.stdout.write('RPD (Respostas) processado.')

            # 7. LOG_POD_DIARIO
            # id_log | data | status | usuario_fk | atividade_fk
            log_pod_diario_data = [
                (207,'2025-08-20 00:00:00',1,1,2), (209,'2025-08-20 00:00:00',1,1,15), (210,'2025-08-20 00:00:00',1,1,12),
                (211,'2025-08-20 00:00:00',1,1,5), (212,'2025-08-20 00:00:00',1,1,1), (213,'2025-08-20 00:00:00',1,1,9),
                (214,'2025-08-20 00:00:00',1,1,6), (215,'2025-08-20 00:00:00',1,1,13), (217,'2025-08-20 00:00:00',1,1,16),
                (219,'2025-08-21 00:00:00',1,1,2), (220,'2025-08-22 00:00:00',1,1,5), (221,'2025-08-21 00:00:00',1,1,15),
                (222,'2025-08-21 00:00:00',1,1,12), (223,'2025-08-21 00:00:00',1,1,5), (224,'2025-03-09 00:00:00',1,1,1),
                (225,'2025-08-21 00:00:00',1,1,9), (226,'2025-08-21 00:00:00',1,1,6), (227,'2025-08-21 00:00:00',1,1,13),
                (228,'2025-08-25 00:00:00',1,1,5), (229,'2025-08-21 00:00:00',1,1,16), (230,'2025-08-22 00:00:00',1,1,2),
                (231,'2025-08-22 00:00:00',1,1,15), (232,'2025-08-22 00:00:00',1,1,12), (233,'2025-08-22 00:00:00',1,1,5),
                (234,'2025-08-22 00:00:00',1,1,1), (236,'2025-08-22 00:00:00',1,1,6), (237,'2025-08-22 00:00:00',1,1,13),
                (241,'2025-08-23 00:00:00',1,1,2), (243,'2025-08-23 00:00:00',1,1,15), (245,'2025-01-09 00:00:00',1,1,1),
                (247,'2025-08-25 00:00:00',1,1,6), (248,'2025-08-23 00:00:00',1,1,13), (250,'2025-08-20 00:00:00',1,1,16),
                (252,'2025-08-26 00:00:00',1,1,5), (253,'2025-08-27 00:00:00',1,1,5), (254,'2025-08-28 00:00:00',1,1,5),
                (255,'2025-08-29 00:00:00',1,1,5), (256,'2025-02-09 00:00:00',1,1,5), (257,'2025-03-09 00:00:00',1,1,5),
                (258,'2025-08-27 00:00:00',1,1,6), (259,'2025-08-28 00:00:00',1,1,6), (260,'2025-08-29 00:00:00',1,1,6),
                (261,'2025-03-09 00:00:00',1,1,2), (262,'2025-04-09 00:00:00',1,1,2), (263,'2025-08-25 00:00:00',1,1,2),
                (264,'2025-08-28 00:00:00',1,1,2), (265,'2025-04-09 00:00:00',1,1,12), (266,'2025-08-23 00:00:00',1,1,12),
                (267,'2025-08-24 00:00:00',1,1,12), (268,'2025-08-25 00:00:00',1,1,12), (269,'2025-08-26 00:00:00',1,1,12),
                (270,'2025-08-27 00:00:00',1,1,12), (271,'2025-08-28 00:00:00',1,1,12), (272,'2025-08-29 00:00:00',1,1,12),
                (273,'2025-08-30 00:00:00',1,1,12), (274,'2025-08-31 00:00:00',1,1,12), (275,'2025-01-09 00:00:00',1,1,12),
                (276,'2025-02-09 00:00:00',1,1,12), (277,'2025-03-09 00:00:00',1,1,12), (278,'2025-08-24 00:00:00',1,1,15),
                (279,'2025-08-25 00:00:00',1,1,15), (280,'2025-08-26 00:00:00',1,1,15), (281,'2025-08-27 00:00:00',1,1,15),
                (282,'2025-08-28 00:00:00',1,1,15), (283,'2025-08-29 00:00:00',1,1,15), (284,'2025-08-30 00:00:00',1,1,15),
                (285,'2025-08-31 00:00:00',1,1,15), (286,'2025-01-09 00:00:00',1,1,15), (287,'2025-02-09 00:00:00',1,1,15),
                (288,'2025-03-09 00:00:00',1,1,15), (292,'2025-09-04 08:46:18',1,1,12), (313,'2025-09-04 08:50:00',1,1,2),
                (325,'2025-09-04 08:50:40',1,1,2), (327,'2025-09-04 08:50:40',1,1,15), (337,'2025-08-17 00:00:00',1,1,1), # Corrected status
                (345,'2025-08-17 00:00:00',1,1,1), # Corrected status
                (346,'2025-08-17 00:00:00',1,1,1), # Corrected status
                (347,'2025-08-17 00:00:00',1,1,1), # Corrected status
                (361,'2025-08-14 00:00:00',1,1,1), # Corrected status
                (362,'2025-08-14 00:00:00',1,1,1), # Corrected status
                (363,'2025-08-14 00:00:00',1,1,1), # Corrected status
                (381,'2025-08-15 00:00:00',1,1,1), # Corrected status
                (382,'2025-08-15 00:00:00',1,1,1), # Corrected status
                (383,'2025-08-15 00:00:00',1,1,1), # Corrected status
                (384,'2025-08-15 00:00:00',1,1,1), # Corrected status
                (398,'2025-08-16 00:00:00',1,1,1), # Corrected status
                (399,'2025-08-16 00:00:00',1,1,1), # Corrected status
                (400,'2025-08-16 00:00:00',1,1,1), # Corrected status
                (411,'2025-08-18 00:00:00',1,1,1), # Corrected status
                (413,'2025-08-18 00:00:00',1,1,1), # Corrected status
                (414,'2025-08-18 00:00:00',1,1,1), # Corrected status
                (415,'2025-08-18 00:00:00',1,1,1), # Corrected status
                (417,'2025-08-18 00:00:00',1,1,1), # Corrected status
                (418,'2025-08-18 00:00:00',1,1,1), # Corrected status
                (419,'2025-08-18 00:00:00',1,1,1), # Corrected status
                (421,'2025-08-19 00:00:00',1,1,1), # Corrected status
                (422,'2025-08-19 00:00:00',1,1,1), # This was already correct
                (423,'2025-08-20 00:00:00',1,1,1), # Corrected status
                (424,'2025-08-19 00:00:00',1,1,1), # Corrected status
                (425,'2025-08-20 00:00:00',1,1,1), # Corrected status
                (426,'2025-08-20 00:00:00',1,1,1), # Corrected status
                (427,'2025-08-20 00:00:00',1,1,1), # Corrected status
                (428,'2025-08-20 00:00:00',1,1,1), # This was already correct
                (429,'2025-08-20 00:00:00',1,1,1), # Corrected status
                (430,'2025-08-20 00:00:00',1,1,1), # Corrected status
                (431,'2025-08-20 00:00:00',1,1,1), # Corrected status
                (432,'2025-08-19 00:00:00',1,1,1), # Corrected status
                (433,'2025-08-20 00:00:00',1,1,1), # Corrected status
                (434,'2025-08-19 00:00:00',1,1,1), # Corrected status
                (435,'2025-08-21 00:00:00',1,1,1), # Corrected status
                (436,'2025-08-22 00:00:00',1,1,1), # Corrected status
                (437,'2025-08-21 00:00:00',1,1,1), # Corrected status
                (438,'2025-08-21 00:00:00',1,1,1), # Corrected status
                (439,'2025-08-21 00:00:00',1,1,1), # Corrected status
                (440,'2025-03-09 00:00:00',1,1,1), # This was already correct
                (441,'2025-08-21 00:00:00',1,1,1), # Corrected status
                (442,'2025-08-21 00:00:00',1,1,1), # Corrected status
                (443,'2025-08-21 00:00:00',1,1,1), # Corrected status
                (444,'2025-08-25 00:00:00',1,1,5), # Corrected status
                (445,'2025-08-21 00:00:00',1,1,16), # This was already correct
                (446,'2025-08-22 00:00:00',1,1,2), # This was already correct
                (447,'2025-08-22 00:00:00',1,1,15), # This was already correct
                (448,'2025-08-22 00:00:00',1,1,12), # This was already correct
                (449,'2025-08-22 00:00:00',1,1,5), # This was already correct
                (450,'2025-08-22 00:00:00',1,1,1), # This was already correct
                (654,'2025-09-07 18:31:09',1,1,2), # This was already correct
                (658,'2025-09-07 18:31:09',1,1,11), # This was already correct
                (660,'2025-09-07 18:31:09',1,1,14), # This was already correct
                (661,'2025-09-07 18:31:09',1,1,15), # This was already correct
                (669,'2025-09-07 18:31:10',1,1,13) # This was already correct
            ]

            for old_id, data_str, status_int, user_fk, atv_fk in log_pod_diario_data:
                dono = user_map.get(user_fk)
                atividade = atividade_map.get(atv_fk)
                if not dono or not atividade:
                    self.stdout.write(self.style.WARNING(f"Usuário ou Atividade FK não encontrado para LogPODDiario ID {old_id}. Pulando."))
                    continue
                
                LogPODDiario.objects.get_or_create(
                    data=make_aware_if_naive(parse_datetime(data_str)),
                    usuario=dono,
                    atividade=atividade,
                    defaults={'status': bool(status_int)}
                )
            self.stdout.write('Log POD Diário processado.')


        self.stdout.write(self.style.SUCCESS('Banco populado com sucesso!'))