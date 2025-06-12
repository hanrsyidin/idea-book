# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IdeaViewSet

# Membuat sebuah router
router = DefaultRouter()
# Mendaftarkan ViewSet kita dengan router
router.register(r'ideas', IdeaViewSet, basename='idea')

# URL patterns sekarang di-generate otomatis oleh router
urlpatterns = router.urls