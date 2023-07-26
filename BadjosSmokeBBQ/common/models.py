from django.db import models


class Message(models.Model):
    # subject = models.CharField(max_length=100)
    sender_name = models.CharField(
        max_length=200,
    )
    message = models.TextField()
    sender_email = models.EmailField()


class Newsletter(models.Model):
    email = models.EmailField()
