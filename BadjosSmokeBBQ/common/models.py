from django.db import models


class Message(models.Model):
    # subject = models.CharField(max_length=100)
    message = models.TextField()
    sender = models.EmailField()
