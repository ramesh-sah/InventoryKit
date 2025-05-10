from rest_framework.viewsets import ModelViewSet

from account.models import User  # model viewset give us all access to CRUD operations.
from .serializers import PurchaseSerializer, PurchaseItemSerializer
from .models import Purchase, PurchaseItem
from .renderers import UserRenderer
from inventorykit.permissions import  IsSalesStaff, IsPurchaseStaff
from django.db.models import Q

# Create your views here.

class AdminPurchaseView(ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Purchase.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user



class AdminPurchaseItemView(ModelViewSet):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return PurchaseItem.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user




class PurchaseStaffPurchaseView(ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]


class PurchaseStaffPurchaseItemView(ModelViewSet):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    
    


