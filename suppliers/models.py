from django.db import models


# Supplier Model
class Supplier(models.Model):
    """
    This model represents a supplier. Each supplier has essential details like
    name, contact information, tax details, and status.
    """
    name = models.CharField(max_length=255)  # Name of the supplier
    phone_number = models.CharField(max_length=20, blank=True, null=True)  # Supplier's phone number
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
    created_at = models.DateTimeField(auto_now_add=True)  # When the supplier was added

    def __str__(self):
        return self.name
