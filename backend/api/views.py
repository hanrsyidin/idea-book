from django.shortcuts import render

from rest_framework import viewsets
from .models import Idea
from .serializers import IdeaSerializer

class IdeaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ideas to be viewed or edited.
    """
    queryset = Idea.objects.all().order_by('-created_at')
    serializer_class = IdeaSerializer