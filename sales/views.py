from rest_framework.viewsets import ModelViewSet
from .models import Sale, SaleItem
from .serializers import SaleSerializer, ItemSaleSerializer
from .renderers import UserRenderer


class AdminSaleView(ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    # renderer_classes = [UserRenderer]


class AdminItemSaleView(ModelViewSet):
    queryset = SaleItem.objects.all()
    serializer_class = ItemSaleSerializer
    # renderer_classes = [UserRenderer]
