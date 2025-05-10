from django.db import models
from django.conf import settings

from account.models import User
from django.utils.translation import gettext_lazy as _

# ExpenseCategory Model
class ExpenseCategory(models.Model):
    """
    This model defines different categories of expenses for reporting purposes.
    """
    name = models.CharField(max_length=100)  # Category name (e.g., 'Utilities', 'Supplies')
    description = models.TextField(blank=True, null=True)  # A brief description of the category
    created_by = models.ForeignKey(
        User,
        related_name='expenses_category_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
         ,null=True
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True,null=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True,null=True)

    def __str__(self):
        return self.name


# Expense Model
class Expense(models.Model):
    """
    This model tracks expenses for the business. Each expense is categorized,
    and includes details like date, reference number, amount, and notes.
    """
    category = models.ForeignKey(ExpenseCategory, on_delete=models.SET_NULL, null=True)  # The category of the expense
    date = models.DateField()  # Date of the expense
    reference_no = models.CharField(max_length=50, unique=True)  # Reference number for the expense
    amount = models.DecimalField(max_digits=12, decimal_places=2)  # Amount of the expense
    notes = models.TextField(blank=True, null=True)  # Additional notes related to the expense
    created_by = models.ForeignKey(
        User,
        related_name='created_expenses',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
         ,null=True
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    def __str__(self):
        return f"Expense {self.reference_no} (Amount: {self.amount})"
