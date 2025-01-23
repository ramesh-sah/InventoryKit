from django.db import models
from django.contrib.auth.models import User
from sales.models import Sale  # Assuming you have the sales app
from purchase.models import Purchase  # Assuming you have the purchases app
from django.conf import settings


# Payment Method Model
class PaymentMethod(models.Model):
    name = models.CharField(max_length=50)  # Name of the payment method (e.g., "Cash", "Credit Card", etc.)
    description = models.TextField(blank=True, null=True)  # Optional description

    def __str__(self):
        return self.name


# Payment Model
class Payment(models.Model):
    payment_date = models.DateField()  # Date of payment
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True)  # Payment method used
    amount = models.DecimalField(max_digits=12, decimal_places=2)  # Amount paid
    payment_reference = models.CharField(max_length=100, unique=True)  # Payment reference number (e.g., transaction ID)
    notes = models.TextField(blank=True, null=True)  # Optional notes for the payment
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set to current date and time

    # Linking payments to purchases or sales
    sale = models.ForeignKey(Sale, on_delete=models.SET_NULL, null=True,
                             blank=True)  # Link to a sale if it's a payment for a sale
    purchase = models.ForeignKey(Purchase, on_delete=models.SET_NULL, null=True,
                                 blank=True)  # Link to a purchase if it's a payment for a purchase

    def __str__(self):
        return f"Payment {self.payment_reference} - Amount: {self.amount} ({self.payment_method.name})"


# Transaction Model (Optional, for tracking payment transactions)
class Transaction(models.Model):
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)  # Link the transaction to a payment
    transaction_date = models.DateTimeField(auto_now_add=True)  # Date and time of the transaction
    transaction_reference = models.CharField(max_length=100, unique=True)  # Unique reference for the transaction
    transaction_status = models.CharField(max_length=50,
                                          default='pending')  # Status of the transaction (e.g., "completed", "pending")
    amount = models.DecimalField(max_digits=12, decimal_places=2)  # Amount for the transaction
    payment_status = models.CharField(max_length=50, default='paid')  # Payment status (e.g., "paid", "failed")

    def __str__(self):
        return f"Transaction {self.transaction_reference} - Status: {self.transaction_status}"
