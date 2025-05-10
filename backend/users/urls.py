from users.views import register, login, user_details_view
from django.urls import path

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('details/', user_details_view, name='user_details'),  # GET/PUT user details
]
