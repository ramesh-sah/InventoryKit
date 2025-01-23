from .serializers import CategorySerializer, ItemsSerializer
from .models import Category, Item
from .renderers import UserRenderer
from rest_framework.viewsets import ModelViewSet
from inventorykit.permissions import IsPurchaseStaff,IsSalesStaff,IsSuperAdminOrAdmin


class AdminCategoryView(ModelViewSet):
    queryset = Category.objects.all()  # Get all categories from the database
    serializer_class = CategorySerializer  # Use the CategorySerializer to serialize data
    # permission_classes = [IsSuperAdminOrAdmin]
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]


class AdminItemsView(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemsSerializer
    # renderer_classes = [UserRenderer]
    # permission_classes = [IsSuperAdminOrAdmin]

