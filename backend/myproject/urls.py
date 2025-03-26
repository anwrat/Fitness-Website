from django.contrib import admin
from django.urls import path, include
from users import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # Include users app URLs
    path('', views.home, name='home'),
    
]
