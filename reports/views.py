from rest_framework.viewsets import ModelViewSet

from account.models import User
from .serializers import ReportSerializer
from .models import Report
from .renderers import UserRenderer
from django.db.models import Q

class AdminReportViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    # renderer_classes = [UserRenderer]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Report.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user

    
    
class PurchaseStaffReportViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    # renderer_classes = [UserRenderer]
    
    
class SaleStaffReportViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    # renderer_classes = [UserRenderer]


