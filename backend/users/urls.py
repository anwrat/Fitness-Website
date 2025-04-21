#Creating urls for frontend to communicate with backend 
from django.urls import path
from users.views import register, login

urlpatterns = [
    path('register/', register, name='register'),  # Register endpoint
    path('login/', login, name='login'),  # Login endpoint
]