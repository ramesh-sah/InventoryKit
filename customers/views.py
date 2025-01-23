from rest_framework.viewsets import ModelViewSet
from account.models import User
from .serializers import CustomerSerializer
from .models import Customer
from .renderers import UserRenderer
from inventorykit.permissions import IsSuperAdminOrAdmin, IsSalesStaff, IsPurchaseStaff
from django.db.models import Q

class AdminCustomerView(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Customer.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))

    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user
        
        
class SaleStaffCustomerView(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
         # Filter customers based on those users
        created_users=User.objects.filter(email=user.created_by)
        return Customer.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
      

        

    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user
    
    
    
