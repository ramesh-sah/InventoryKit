from rest_framework.viewsets import ModelViewSet
from .models import Supplier
from .serializers import SupplierSerializers
from .renderers import UserRenderer
from inventorykit.permissions import IsSuperAdminOrAdmin, IsPurchaseStaff, IsSalesStaff


class AdminSupplierView(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializers
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]
