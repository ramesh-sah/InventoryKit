from django.db import models
from django.conf import settings


# ExpenseCategory Model
class ExpenseCategory(models.Model):
    """
    This model defines different categories of expenses for reporting purposes.
    """
    name = models.CharField(max_length=100)  # Category name (e.g., 'Utilities', 'Supplies')
    description = models.TextField(blank=True, null=True)  # A brief description of the category

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
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the expense was created

    def __str__(self):
        return f"Expense {self.reference_no} (Amount: {self.amount})"
