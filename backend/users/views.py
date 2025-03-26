from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

# In views.py
from django.shortcuts import render

def home(request):
    return render(request, 'users/home.html')  # Assuming 'home.html' is inside the 'users/templates/users' folder
  # Make sure the home.html exists in your templates folder

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user with basic validation.
    """
    try:
        data = request.data
        username = data.get("username")
        password = data.get("password")

        # Basic validation: username and password are required
        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Create new user
        user = User.objects.create_user(username=username, password=password)

        # Respond with a success message
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Log in a user and provide a JWT token.
    """
    try:
        data = request.data
        username = data.get("username")
        password = data.get("password")

        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user:
            # Generate JWT tokens if user is authenticated
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'Login successful'
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
