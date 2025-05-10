from rest_framework.viewsets import ModelViewSet

from account.models import User
from .models import Sale, SaleItem
from .serializers import SaleSerializer, ItemSaleSerializer
from .renderers import UserRenderer
from django.db.models import Q


class AdminSaleView(ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    # renderer_classes = [UserRenderer]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Sale.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user

class AdminSaleItemView(ModelViewSet):
    queryset = SaleItem.objects.all()
    serializer_class = ItemSaleSerializer
    # renderer_classes = [UserRenderer]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Sale.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user
    
    
class  SaleStaffSaleView(ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    # renderer_classes = [UserRenderer]


class SaleStaffSaleItemView(ModelViewSet):
    queryset = SaleItem.objects.all()
    serializer_class = ItemSaleSerializer
    # renderer_classes = [UserRenderer]

