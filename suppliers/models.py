from django.db import models

from account.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
# Supplier Model


class Supplier(models.Model):
    """
    This model represents a supplier. Each supplier has essential details like
    name, contact information, tax details, and status.
    """
    name = models.CharField(max_length=255)  # Name of the supplier
    phone_number = PhoneNumberField(region='NP',null=True)   # Supplier's phone number
    email = models.EmailField(blank=True, null=True)  # Supplier's email address
    country = models.CharField(max_length=100)  # Supplier's country
    state = models.CharField(max_length=100)  # Supplier's state
    city = models.CharField(max_length=100)  # Supplier's city
    postal_code = models.CharField(max_length=20, blank=True, null=True)  # Supplier's postal code
    address = models.TextField(blank=True, null=True)  # Supplier's address
    tax_no = models.CharField(max_length=100, blank=True, null=True)  # Supplier's tax number
    gst_no = models.CharField(max_length=100, blank=True, null=True)  # Supplier's GST number
    status = models.CharField(
        max_length=20, choices=[('paid', 'Paid'), ('pending', 'Pending'), ('partial', 'Partial')], default='pending'
    )  # Payment status
    created_at = models.DateTimeField(_('created at'), auto_now_add=True,null=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True, null=True)
    created_by = models.ForeignKey(
        User,
        related_name='supplier_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
    )

    def __str__(self):
        return self.name
