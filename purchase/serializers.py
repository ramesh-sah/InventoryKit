from rest_framework import serializers
from .models import Purchase, PurchaseItem


class PurchaseItemSerializer(serializers.ModelSerializer):
    product = serializers.CharField(source='item.name')
    total = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = PurchaseItem
        fields = ['id', 'purchase', 'product', 'quantity', 'price_per_unit', 'total']


class PurchaseSerializer(serializers.ModelSerializer):
    purchase_items = PurchaseItemSerializer(many=True, read_only=True)

    class Meta:
        model = Purchase
        fields = ['id', 'purchase_date', 'status', 'reference_no', 'notes', 'created_at', 'supplier', 'created_by',
                  'purchase_items']
