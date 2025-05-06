# models.py in your app
from django.db import models

class Recipe(models.Model):
    FOOD_TYPE_CHOICES = [
        ('Vegan', 'Vegan'),
        ('Vegetarian', 'Vegetarian'),
        ('Non-Vegetarian', 'Non-Vegetarian'),
    ]

    NUTRITION_TYPE_CHOICES = [
        ('High Carb', 'High Carb'),
        ('Low Carb', 'Low Carb'),
        ('High Protein', 'High Protein'),
        ('Low Protein', 'Low Protein'),
        ('Balanced', 'Balanced'),
        ('Very Nutritious', 'Very Nutritious'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    calories = models.PositiveIntegerField(help_text="Calories per serving")
    ingredients = models.TextField(help_text="List ingredients separated by commas")
    instruction = models.TextField(help_text="Step-by-step preparation instructions")
    image_url = models.URLField(blank=True, null=True)
    food_type = models.CharField(max_length=20, choices=FOOD_TYPE_CHOICES)
    nutrition_type = models.CharField(max_length=30, choices=NUTRITION_TYPE_CHOICES)

    def __str__(self):
        return self.name
