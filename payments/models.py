from django.db import models
from account.models import User
from sales.models import Sale  # Assuming you have the sales app
from purchase.models import Purchase  # Assuming you have the purchases app
from django.utils.translation import gettext_lazy as _


# Payment Method Model
class PaymentMethod(models.Model):
    
    name = models.CharField(max_length=50)  # Name of the payment method (e.g., "Cash", "Credit Card", etc.)
    description = models.TextField(blank=True, null=True)  # Optional description
    created_by = models.ForeignKey(
        User,
        related_name='payment_method_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
         ,null=True
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True,null=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True, null=True)

    def __str__(self):
        return self.name


# Payment Model
class Payment(models.Model):
    payment_date = models.DateField()  # Date of payment
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True)  # Payment method used
    amount = models.DecimalField(max_digits=12, decimal_places=2)  # Amount paid
    payment_reference = models.CharField(max_length=100, unique=True)  # Payment reference number (e.g., transaction ID)
    notes = models.TextField(blank=True, null=True)  # Optional notes for the payment
    created_by = models.ForeignKey(
        User,
        related_name='payment_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
         ,null=True
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True,null=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True, null=True)

    # Linking payments to purchases or sales
    sale = models.ForeignKey(Sale, on_delete=models.SET_NULL, null=True,
                             blank=True)  # Link to a sale if it's a payment for a sale
    purchase = models.ForeignKey(Purchase, on_delete=models.SET_NULL, null=True,
                                 blank=True)  # Link to a purchase if it's a payment for a purchase

    def __str__(self):
        return f"Payment {self.payment_reference} - Amount: {self.amount} ({self.payment_method.name})"


# Transaction Model (Optional, for tracking payment transactions)
class Transaction(models.Model):
    created_by = models.ForeignKey(
        User,
        related_name='transaction_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
         ,null=True
        
    )
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)  # Link the transaction to a payment
    transaction_date = models.DateTimeField(auto_now_add=True)  # Date and time of the transaction
    transaction_reference = models.CharField(max_length=100, unique=True)  # Unique reference for the transaction
    transaction_status = models.CharField(max_length=50,
                                          default='pending')  # Status of the transaction (e.g., "completed", "pending")
    amount = models.DecimalField(max_digits=12, decimal_places=2)  # Amount for the transaction
    payment_status = models.CharField(max_length=50, default='paid')  # Payment status (e.g., "paid", "failed")
    created_at = models.DateTimeField(_('created at'), auto_now_add=True,null=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True, null=True)

    def __str__(self):
        return f"Transaction {self.transaction_reference} - Status: {self.transaction_status}"
