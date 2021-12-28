from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    following = models.ManyToManyField(User, related_name='following', blank=True)
    bio = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def profiles_following(self):
        return self.following.all()

    def __str__(self):
        return str(self.user.username)

    class Meta:
        verbose_name_plural = 'Profiles'
        ordering = ['-created_at']