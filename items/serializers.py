from rest_framework import serializers
from .models import Category, Item


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ItemsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = "__all__"
