from rest_framework.viewsets import ModelViewSet  # model viewset give us all access to CRUD operations.
from .serializers import PurchaseSerializer, PurchaseItemSerializer
from .models import Purchase, PurchaseItem
from .renderers import UserRenderer
from inventorykit.permissions import IsSuperAdminOrAdmin, IsSalesStaff, IsPurchaseStaff


# Create your views here.

class AdminPurchaseView(ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]


class AdminPurchaseItemView(ModelViewSet):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]

