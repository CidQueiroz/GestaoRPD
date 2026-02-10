from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EstoqueViewSet, VendaViewSet, AtividadeViewSet, DiarioBordoViewSet, 
    RPDViewSet, LogPODDiarioViewSet, CourseViewSet, LessonViewSet, 
    WarRoomLogViewSet, DailyCourseActivityViewSet, FinanceChatView,
    TransactionViewSet, GoalViewSet
)

router = DefaultRouter()
router.register(r'estoque', EstoqueViewSet)
router.register(r'vendas', VendaViewSet)
router.register(r'atividades', AtividadeViewSet)
router.register(r'diario_bordo', DiarioBordoViewSet)
router.register(r'rpd', RPDViewSet)
router.register(r'log_pod_diario', LogPODDiarioViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'war-room-logs', WarRoomLogViewSet)
router.register(r'daily-course-activities', DailyCourseActivityViewSet)
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'goals', GoalViewSet, basename='goal')

urlpatterns = [
    path('', include(router.urls)),
    path('finance-chat/', FinanceChatView.as_view(), name='finance-chat'),
]