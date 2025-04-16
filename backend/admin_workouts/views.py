from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from .models import Workout
from .serializers import WorkoutSerializer

# ✅ Existing ViewSet (handles GET, POST, DELETE, PUT via router)
class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [AllowAny]  # 👈 This allows any request, no auth required


# ✅ NEW: Custom PUT API using workout_id (Optional)
@api_view(['PUT'])
@permission_classes([AllowAny])
def custom_update_workout(request, workout_id):
    try:
        workout = Workout.objects.get(id=workout_id)
    except Workout.DoesNotExist:
        return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = WorkoutSerializer(workout, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
