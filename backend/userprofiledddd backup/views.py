from rest_framework import generics, permissions
from .models import UserDetail
from .serializers import UserDetailSerializer

class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.AllowAny]  # Allow access to any user (authenticated or not)

    def get_object(self):
        return self.request.user.details
