from django.contrib import admin
from .models import Empresa, Usuario, Estoque, Venda, Atividade, DiarioBordo, RPD, LogPODDiario, Course, Lesson # Import Course and Lesson

# Register your models here.
admin.site.register(Empresa)
admin.site.register(Usuario) # Your custom user model
admin.site.register(Estoque)
admin.site.register(Venda)
admin.site.register(Atividade)
admin.site.register(DiarioBordo)
admin.site.register(RPD)
admin.site.register(LogPODDiario)
admin.site.register(Course) # Register Course
admin.site.register(Lesson) # Register Lesson
