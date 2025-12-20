from django.db import models
from django.contrib.auth.models import User


class Volunteer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='volunteers')
    status = models.ForeignKey("Status", on_delete=models.CASCADE, related_name='volunteers')
    full_name = models.CharField(max_length=155)
    phone = models.CharField(max_length=155)
    email = models.CharField(max_length=155)