from rest_framework.viewsets import ModelViewSet
from .serializers import ExpenseSerializer, ExpenseCategorySerializer
from .models import Expense, ExpenseCategory
from .renderers import UserRenderer
from inventorykit.permissions import IsSuperAdminOrAdmin,IsSalesStaff,IsPurchaseStaff


class AdminExpenseCategoryListView(ModelViewSet):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]


class AdminExpenseListView(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]

