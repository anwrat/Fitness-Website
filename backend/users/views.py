from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserDetails
from .serializers import UserDetailsSerializer


def home(request):
    return render(request, 'users/home.html')  # Ensure 'home.html' exists in templates


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user along with their details.
    """
    try:
        data = request.data
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")  # Get the email field from the request data
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        height = data.get("height")
        weight = data.get("weight")
        date_of_birth = data.get("date_of_birth")
        gender = data.get("gender")
        avatar = data.get("avatar")

        # Validate if username, password, and email are provided
        if not username or not password or not email:
            return Response({"error": "Username, password, and email are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(date_of_birth, str):
            return Response({"error": "Date of birth should be in YYYY-MM-DD format."}, status=status.HTTP_400_BAD_REQUEST)

        # Create user with email and password
        user = User.objects.create_user(username=username, password=password, email=email)

        # Create user details
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
@permission_classes([AllowAny])
def login(request):
    """
    Log in a user using either their username or email and return a JWT token.
    Also returns the user's role (admin or regular user).
    """
    try:
        data = request.data
        username_or_email = data.get("username")  # This can be either username or email
        password = data.get("password")

        if not username_or_email or not password:
            return Response({"error": "Username/email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Try to find user by username or email
        user = None

        # Check if the provided username_or_email is an email
        if '@' in username_or_email:
            user = User.objects.filter(email=username_or_email).first()
        else:
            user = User.objects.filter(username=username_or_email).first()

        if user and user.check_password(password):  # Check if the password matches
            refresh = RefreshToken.for_user(user)
            
            # Check if the user is an admin (using is_staff or is_superuser)
            role = "admin" if user.is_staff else "user"
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': role,  # Return the role of the user
                'message': 'Login successful'
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_details_view(request):
    """
    View or update the authenticated user's profile details.
    """
    try:
        user = request.user
        details = user.details

        if request.method == 'GET':
            serializer = UserDetailsSerializer(details)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            if user != details.user:
                return Response({"error": "You cannot edit another user's details."}, status=status.HTTP_403_FORBIDDEN)

            serializer = UserDetailsSerializer(details, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except UserDetails.DoesNotExist:
        return Response({"error": "User details not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
