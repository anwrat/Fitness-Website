from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = [
            'id', 'name', 'description', 'calories', 'ingredients', 'instruction', 'image_url', 'food_type', 'nutrition_type',
        ]

    def validate_calories(self, value):
        if value < 0:
            raise serializers.ValidationError("Calories must be a positive number.")
        return value

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Name must be at least 3 characters long.")
        return value

    def validate_ingredients(self, value):
        if not value:
            raise serializers.ValidationError("Ingredients cannot be empty.")
        return value

    def validate_food_type(self, value):
        if value not in dict(Recipe.FOOD_TYPE_CHOICES).keys():
            raise serializers.ValidationError("Invalid food type.")
        return value

    def validate_nutrition_type(self, value):
        if value not in dict(Recipe.NUTRITION_TYPE_CHOICES).keys():
            raise serializers.ValidationError("Invalid nutrition type.")
        return value
