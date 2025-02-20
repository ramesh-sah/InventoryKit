from rest_framework.viewsets import ModelViewSet
from django.db.models import Q
from account.models import User
from .serializers import ExpenseSerializer, ExpenseCategorySerializer
from .models import Expense, ExpenseCategory
from .renderers import UserRenderer
from inventorykit.permissions import IsSalesStaff,IsPurchaseStaff


class AdminExpenseCategoryView(ModelViewSet):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return ExpenseCategory.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user



class AdminExpenseView(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Expense.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user



class PurchaseStaffExpenseCategoryView(ModelViewSet):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]


class PurchaseStaffExpenseView(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
    
    

class SalesStaffExpenseCategoryView(ModelViewSet):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]


class SalesStaffExpenseView(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
