from django.db import models
from django.contrib.auth.models import User


class Assignment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignments')
    name = models.CharField(max_length=155)
    