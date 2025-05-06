# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from . import views

# # Create a router and register the Recipe viewset
# router = DefaultRouter()
# router.register(r'recipes', views.RecipeViewSet)

# urlpatterns = [
#     # Auto-generated CRUD routes (list, retrieve, create, update, delete)
#     path('', include(router.urls)),

#     # ✅ Custom update route using recipe_id
#     path('recipes/update/<int:recipe_id>/', views.custom_update_recipe, name='custom-update-recipe'),
# ]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register the Recipe ViewSet
router = DefaultRouter()
router.register(r'recipes', views.RecipeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('recipes/<int:recipe_id>/update/', views.custom_update_recipe, name='custom_update_recipe'),
]
