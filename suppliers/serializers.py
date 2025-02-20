from rest_framework import serializers

from account.serializers import UserProfileSerializer
from .models import Supplier


class SupplierSerializers(serializers.ModelSerializer):
    created_by = UserProfileSerializer(read_only=True) 
    class Meta:
        model = Supplier
        fields = [
            'id',              # Assuming you have an ID field for the supplier
            'name',
            'phone_number',
            'email',
            'country',
            'state',
            'city',
            'postal_code',
            'address',
            'tax_no',
            'gst_no',
            'status',
            'created_at',
            'created_by'
        
        ]
        read_only_fields = ['id', 'created_at']  # Make ID and created_at read-only
