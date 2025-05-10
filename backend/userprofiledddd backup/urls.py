from django.urls import path
from .views import UserDetailView

urlpatterns = [
    path('user/profile/', UserDetailView.as_view(), name='user-profile'),
]
