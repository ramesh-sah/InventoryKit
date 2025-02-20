from account.models import User
from .serializers import CategorySerializer, ItemsSerializer
from .models import Category, Item
from .renderers import UserRenderer
from rest_framework.viewsets import ModelViewSet
from inventorykit.permissions import IsPurchaseStaff,IsSalesStaff,IsSuperAdmin
from django.db.models import Q

class AdminCategoryView(ModelViewSet):
    queryset = Category.objects.all()  # Get all categories from the database
    serializer_class = CategorySerializer  # Use the CategorySerializer to serialize data
    # permission_classes = [IsSuperAdminOrAdmin]
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Category.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user



class AdminItemsView(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemsSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Item.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user
    
    
    
    
class PurchaseStaffCategoryView(ModelViewSet):
    queryset = Category.objects.all()  # Get all categories from the database
    serializer_class = CategorySerializer  # Use the CategorySerializer to serialize data
    # permission_classes = [IsSuperAdminOrAdmin]
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
class PurchaseStaffItemsView(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemsSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    
    
    
class SaleStaffCategoryView(ModelViewSet):
    queryset = Category.objects.all()  # Get all categories from the database
    serializer_class = CategorySerializer  # Use the CategorySerializer to serialize data
    # permission_classes = [IsSuperAdminOrAdmin]
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
class SaleStaffItemsView(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemsSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]


