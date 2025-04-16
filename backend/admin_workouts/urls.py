from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register the viewset
router = DefaultRouter()
router.register(r'workouts', views.WorkoutViewSet)

urlpatterns = [
    # This will automatically include all the necessary CRUD routes
    path('', include(router.urls)),

    # ✅ Custom update route using workout_id
    path('workouts/update/<int:workout_id>/', views.custom_update_workout, name='custom-update-workout'),
]
