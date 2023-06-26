from django.urls import path
from .views import JobDetailView, JobListView, JobDeleteView, JobAPIView

app_name = 'jobs'

urlpatterns = [
    path('', JobListView.as_view(), name='list'),
    path('<int:pk>/', JobDetailView.as_view(), name='detail'),
    path('create/', JobAPIView.as_view(), name='create'),
    path('delete/', JobAPIView.as_view(), name='delete_bulk'),
    path('delete/<int:pk>/', JobDeleteView.as_view(), name='delete_single'),
]