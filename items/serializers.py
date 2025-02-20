from rest_framework import serializers

from account.serializers import UserProfileSerializer
from .models import Category, Item


class CategorySerializer(serializers.ModelSerializer):
    created_by = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Category
        fields = "__all__"


class ItemsSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    created_by = UserProfileSerializer(read_only=True)

    class Meta:
        model = Item
        fields = "__all__"
