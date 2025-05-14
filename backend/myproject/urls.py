
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

# from django.contrib import admin
# from django.urls import path, include
# from users import views
# from users.views import login,register,user_details_view

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('users.urls')),  # Include users app URLs
#     path('', views.home, name='home'),
#     path('login/', login, name='login'),
#     path('register/', register, name='register'),
#     path('details/', user_details_view, name='details'),
#     path('api/', include('admin_workouts.urls')),  # Include workouts API URLs
#     path('api/', include('recipe.urls')),  # Include recipe API URLs
#       # Include users app URLs (with unique prefix)
    
# ]
from django.contrib import admin
from django.urls import path, include
from users import views
from users.views import login, register, admin_user_management_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    
    # Auth and user details
    path('login/', login, name='login'),
    path('register/', register, name='register'),

    # Admin user management (custom admin user = username "admin")
    path('details/admin/', admin_user_management_view, name='admin_user_list'),
    path('details/admin/<int:user_id>/', admin_user_management_view, name='admin_user_detail'),

    # API namespace
    path('api/', include([
        path('', include('users.urls')),         # users API
        path('', include('admin_workouts.urls')),  # workouts API
        path('', include('recipe.urls')),        # recipe API
    ])),
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
