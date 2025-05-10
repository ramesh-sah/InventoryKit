from rest_framework import serializers
from .models import Customer
from account.serializers import UserProfileSerializer


class CustomerSerializer(serializers.ModelSerializer):
    created_by = UserProfileSerializer(read_only=True)  # Use nested serializer for created_by
    class Meta:
        model = Customer
        fields =    [  'id',     'name','phone_number','email','shipping_address','created_by','created_at','updated_at']
        
        
        
        

        



