from django.contrib import admin
from django.urls import path, include
from users import views
from users.views import login,register
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # Include users app URLs
    path('', views.home, name='home'),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
]