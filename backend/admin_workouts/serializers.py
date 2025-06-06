from rest_framework import serializers
from .models import Workout

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'category', 'intensity', 'muscle_group', 'description', 'instruction', 'image_url']  

