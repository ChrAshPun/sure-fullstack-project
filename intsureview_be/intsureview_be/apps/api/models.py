from django.db import models

class Job(models.Model):
    position = models.CharField(max_length=40)
    company = models.CharField(max_length=40)
    date_applied = models.DateField()
    location = models.CharField(max_length=40, blank=True)
    received_offer = models.BooleanField(default=False)
    web_stack = models.CharField(max_length=200, blank=True)
