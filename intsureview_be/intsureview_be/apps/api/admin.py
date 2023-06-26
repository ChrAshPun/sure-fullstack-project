from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'position', 'company', 'location', 'date_applied', 'received_offer', 'web_stack')
