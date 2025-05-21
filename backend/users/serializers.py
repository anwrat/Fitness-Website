from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

    def validate_username(self, value):
        user_id = self.instance.id if self.instance else None
        # Debug print (remove in production)
        print(f"Validating username='{value}' for user_id={user_id}")
        if User.objects.exclude(id=user_id).filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value

    def validate_email(self, value):
        user_id = self.instance.id if self.instance else None
        # Debug print (remove in production)
        print(f"Validating email='{value}' for user_id={user_id}")
        if User.objects.exclude(id=user_id).filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value


class UserDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    age = serializers.ReadOnlyField()

    class Meta:
        model = UserDetails
        fields = [
            'user', 'first_name', 'last_name', 'height', 'weight',
            'date_of_birth', 'gender', 'avatar', 'age'
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            # VERY IMPORTANT: pass existing user instance to serializer for update
            user_serializer = UserSerializer(instance=user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
