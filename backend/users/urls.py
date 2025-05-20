#urls.py
from users.views import register, login, admin_user_management_view, user_profile_view
from django.urls import path

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('details/admin/', admin_user_management_view, name='admin_user_list'),
    path('details/admin/<int:user_id>/', admin_user_management_view, name='admin_user_detail'),
    path('api/user-profile/', user_profile_view, name='user_profile_view'),
]
