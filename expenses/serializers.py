from rest_framework import serializers

from account.serializers import UserProfileSerializer
from .models import Expense, ExpenseCategory


class ExpenseCategorySerializer(serializers.ModelSerializer):
    created_by = UserProfileSerializer(read_only=True)
    class Meta:
        model = ExpenseCategory
        fields = "__all__"


class ExpenseSerializer(serializers.ModelSerializer):
    created_by = UserProfileSerializer(read_only=True)
    class Meta:

        model = Expense
        fields = "__all__"
