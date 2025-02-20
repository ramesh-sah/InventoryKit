from django.db import models
from django.utils.translation import gettext_lazy as _
from account.models import User
from phonenumber_field.modelfields import PhoneNumberField

# Customer Model
class Customer(models.Model):
    """
    This model represents a customer. It stores customer-related details
    like name, contact information, and shipping address.
    """
    name = models.CharField(max_length=255)  # Full name of the customer
    phone_number = PhoneNumberField(region='NP',null=True)  # Optional: Specify default region
    email = models.EmailField(unique=True)  # Customer's email address
    shipping_address = models.TextField(blank=True, null=True)  # Customer's shipping address
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    created_by = models.ForeignKey(
        User,
        related_name='customers_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
    )


    def __str__(self):
        return self.name
