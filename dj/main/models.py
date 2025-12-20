from django.db import models

# Create your models here.
class Server(models.Model):
    name = models.CharField(max_length=15)
    age = models.FloatField(max_length=5)
    phoneNumber = models.CharField(max_length=11)
