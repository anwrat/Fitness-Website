from django.db import models

class Workout(models.Model):
    CATEGORY_CHOICES = [
        ('High Intensity', 'High Intensity'),
        ('Low Intensity', 'Low Intensity'),
        ('Weight Lifting', 'Weight Lifting'),
        ('Calisthenics', 'Calisthenics'),
    ]
    INTENSITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]
    MUSCLE_GROUPS = [
        ('Full Body', 'Full Body'),
        ('Legs', 'Legs'),
        ('Chest', 'Chest'),
        ('Back', 'Back'),
        ('Arms', 'Arms'),
        ('Shoulders', 'Shoulders'),
        ('Core', 'Core'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    intensity = models.CharField(max_length=50, choices=INTENSITY_CHOICES)
    muscle_group = models.CharField(max_length=50, choices=MUSCLE_GROUPS)
    description = models.TextField()
    instruction = models.TextField()
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
