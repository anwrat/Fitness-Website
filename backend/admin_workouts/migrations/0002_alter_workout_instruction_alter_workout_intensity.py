# Generated by Django 5.1.7 on 2025-04-16 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_workouts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workout',
            name='instruction',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='workout',
            name='intensity',
            field=models.CharField(choices=[('Low', 'Low'), ('Moderate', 'Moderate'), ('High', 'High')], max_length=50),
        ),
    ]
