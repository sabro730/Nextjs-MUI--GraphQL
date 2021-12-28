# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model

from django.utils import timezone


class Tweet(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE)
    # title = models.CharField(max_length=150)
    description = models.CharField(max_length=140)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.id)