from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView, ListAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer
from intsureview_be.apps.api.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'put', 'patch'] 


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'put', 'patch'] 


class JobDetailView(RetrieveAPIView):
    """
    API endpoint that retrieves a single job.
    """

    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']


class JobListView(ListAPIView):
    """
    API endpoint that retrieves all jobs.
    """

    queryset = Job.objects.all().order_by("-date_applied")
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']


class JobDeleteView(DestroyAPIView):
    """
    API endpoint that deletes a single job.
    """

    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['delete']


class JobAPIView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ['post', 'delete']

    def post(self, request):
        # Create a job
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        # Bulk delete
        job_ids = request.data.get('job_ids', [])
        jobs = Job.objects.filter(pk__in=job_ids)
        deleted_count = jobs.count()
        jobs.delete()
        return Response({'message': f'{deleted_count} jobs deleted'}, status=status.HTTP_200_OK)

