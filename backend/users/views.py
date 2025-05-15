from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny  # Allow anyone to access the endpoints
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserDetails
from .serializers import UserDetailsSerializer, UserSerializer

def home(request):
    return render(request, 'users/home.html')  # Ensure 'home.html' exists in templates


@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to register
def register(request):
    try:
        data = request.data
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        height = data.get("height")
        weight = data.get("weight")
        date_of_birth = data.get("date_of_birth")
        gender = data.get("gender")
        avatar = data.get("avatar")

        if not username or not password or not email:
            return Response({"error": "Username, password, and email are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(date_of_birth, str):
            return Response({"error": "Date of birth should be in YYYY-MM-DD format."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)

        UserDetails.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            height=height,
            weight=weight,
            date_of_birth=date_of_birth,
            gender=gender,
            avatar=avatar
        )

        return Response({"message": "User and details created successfully"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to log in
def login(request):
    try:
        data = request.data
        username_or_email = data.get("username")
        password = data.get("password")

        if not username_or_email or not password:
            return Response({"error": "Username/email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = None
        if '@' in username_or_email:
            user = User.objects.filter(email=username_or_email).first()
        else:
            user = User.objects.filter(username=username_or_email).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            role = "admin" if user.username == "admin" else "user"

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': role,
                'message': 'Login successful'
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def admin_user_management_view(request, user_id=None):
    if request.method == 'GET':
        if user_id:
            # Get single user and details
            user = get_object_or_404(User, id=user_id)
            details = get_object_or_404(UserDetails, user=user)
            return Response({
                'user': UserSerializer(user).data,
                'details': UserDetailsSerializer(details).data
            }, status=status.HTTP_200_OK)
        else:
            # Get all users with details efficiently
            users_with_details = UserDetails.objects.select_related('user').all()
            all_users = [
                {
                    'user': UserSerializer(ud.user).data,
                    'details': UserDetailsSerializer(ud).data
                }
                for ud in users_with_details
            ]
            return Response(all_users, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        user = get_object_or_404(User, id=user_id)
        details = get_object_or_404(UserDetails, user=user)
        serializer = UserDetailsSerializer(details, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user = get_object_or_404(User, id=user_id)
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)