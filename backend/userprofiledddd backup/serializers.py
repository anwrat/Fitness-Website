from rest_framework import serializers
from .models import UserDetail

class UserDetailSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserDetail
        fields = [
            'username',
            'first_name',
            'last_name',
            'height',
            'weight',
            'date_of_birth',
            'gender',
            'avatar_url',
            'age'
        ]
