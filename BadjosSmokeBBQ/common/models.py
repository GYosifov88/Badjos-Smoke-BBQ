from django.db import models


class Message(models.Model):
    # subject = models.CharField(max_length=100)
    sender_name = models.CharField()
    message = models.TextField()
    sender_email = models.EmailField()


class Newsletter(models.Model):
    email = models.EmailField()
