from rest_framework.viewsets import ModelViewSet
from django.db.models import Q
from account.models import User
from .models import Supplier
from .serializers import SupplierSerializers
from .renderers import UserRenderer
from inventorykit.permissions import IsPurchaseStaff, IsSalesStaff


class AdminSupplierView(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializers
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
      
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Supplier.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))

    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user


class PurchaseStaffSuppliersView(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializers
    permission_classes = [IsPurchaseStaff]
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
         # Filter customers based on those users
        created_users=User.objects.filter(email=user.created_by)
        return Supplier.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
      
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user
        
    
    
    