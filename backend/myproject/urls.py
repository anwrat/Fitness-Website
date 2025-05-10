
# from django.contrib import admin
# from django.urls import path, include
# from users import views
# from users.views import login,register
# from admin_workouts import views
# from admin_workouts.views import workout_list

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('users.urls')),  # Include users app URLs
#     path('', views.home, name='home'),
#     path('login/', login, name='login'),
#     path('register/', register, name='register'),
    
# ]

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
    path('api/', include('admin_workouts.urls')),  # Include workouts API URLs
    path('api/', include('recipe.urls')),  # Include recipe API URLs
    path('api/users/', include('users.urls')),  # Include users app URLs (with unique prefix)
    
]

# from django.contrib import admin
# from django.urls import path, include
# from users import views
# from users.views import login,register
# from admin_workouts import views

# urlpatterns = [
#     # Django admin panel
#     path('admin/', admin.site.urls),

#     # Users API (e.g., /api/users/...)
#     path('api/', include('users.urls')),  # Include users app URLs

#     # Admin Workouts API (e.g., /api/workouts/)
#     # path('api/workouts/', include('admin_workouts.urls')),
#     #path('api/', include('admin_workouts.urls')),

#     # Web page views
#     path('', views.home, name='home'),
#     path('login/', login, name='login'),
#     path('register/', register, name='register'),
    
# ]


# from django.contrib import admin
# from django.urls import path, include
# from users import views
# from users.views import login, register
# from admin_workouts import views

# urlpatterns = [
#     # Django admin panel
#     path('admin/', admin.site.urls),

#     # Users API (e.g., /api/users/...)
#     path('api/users/', include('users.urls')),

#     # Admin Workouts API (e.g., /api/workouts/)
#     path('api/workouts/', include('admin_workouts.urls')),

#     # Web page views
#     path('', views.home, name='home'),
#     path('login/', login, name='login'),
#     path('register/', register, name='register'),
# ]
