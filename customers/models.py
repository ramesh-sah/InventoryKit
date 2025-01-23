from django.db import models

from account.models import User


# Customer Model
class Customer(models.Model):
    """
    This model represents a customer. It stores customer-related details
    like name, contact information, and shipping address.
    """
    name = models.CharField(max_length=255)  # Full name of the customer
    phone_number = models.CharField(max_length=20, blank=True, null=True)  # Customer's phone number
    email = models.EmailField(blank=True, null=True)  # Customer's email address
    shipping_address = models.TextField(blank=True, null=True)  # Customer's shipping address
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the customer was created
    created_by = models.ForeignKey(
        User,
        related_name='customers_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
    )


    def __str__(self):
        return self.name
