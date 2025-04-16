from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register the viewset
router = DefaultRouter()
router.register(r'workouts', views.WorkoutViewSet)

urlpatterns = [
    # This will automatically include all the necessary CRUD routes
    path('', include(router.urls)),
]
