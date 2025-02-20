from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from account.models import User  # ModelViewSet gives access to CRUD operations
from .serializers import PurchaseSerializer, PurchaseItemSerializer
from .models import Purchase, PurchaseItem
from inventorykit.permissions import IsSalesStaff, IsPurchaseStaff
from django.db.models import Q


class AdminPurchaseView(ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]  # Ensures only authenticated users access the API

    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # If user is not authenticated, return an empty queryset
        if not user.is_authenticated:
            return Purchase.objects.none()

        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter purchases based on those users
        return Purchase.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user


class AdminPurchaseItemView(ModelViewSet):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    permission_classes = [IsAuthenticated]  # Ensures only authenticated users access the API

    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # If user is not authenticated, return an empty queryset
        if not user.is_authenticated:
            return PurchaseItem.objects.none()

        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter purchase items based on those users
        return PurchaseItem.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user


class PurchaseStaffPurchaseView(ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated, IsPurchaseStaff]  # Restricts access to purchase staff


class PurchaseStaffPurchaseItemView(ModelViewSet):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    permission_classes = [IsAuthenticated, IsPurchaseStaff]  # Restricts access to purchase staff
