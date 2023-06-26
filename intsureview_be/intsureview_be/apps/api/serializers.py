from django.contrib.auth.models import User, Group
from .models import Job
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class JobSerializer(serializers.ModelSerializer):
    position = serializers.CharField(error_messages={'blank': 'This field is required.'})
    company = serializers.CharField(error_messages={'blank': 'This field is required.'})
    date_applied = serializers.DateField(error_messages={'invalid': 'Invalid date format. Expected MM/DD/YYYY.'}, format="%m/%d/%Y", input_formats=['%Y-%m-%d', '%m/%d/%Y'])

    class Meta:
        model = Job
        fields = ["id", "position", "company", "location", "date_applied", "received_offer", "web_stack"]
        

