from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Workout
from .serializers import WorkoutSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [AllowAny]  # 👈 This allows any request, no auth required
