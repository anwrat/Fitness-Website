from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']  # Add other fields as needed

class UserDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested user serializer for user fields
    age = serializers.ReadOnlyField()

    class Meta:
        model = UserDetails
        fields = ['user', 'first_name', 'last_name', 'height', 'weight', 'date_of_birth', 'gender', 'avatar', 'age']
