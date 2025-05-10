from django.db import models

from account.models import User
from django.utils.translation import gettext_lazy as _

class Category(models.Model):
    
    name = models.CharField(max_length=100, unique=True)  # Category name (e.g., Electronics, Clothing, etc.)
    description = models.TextField(blank=True, null=True)  # Optional description for the category
    created_by = models.ForeignKey(
        User,
        related_name='itemCategory_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
        ,null=True
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True,null=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True,null=True)

    def __str__(self):
        return self.name


class Item(models.Model):
    created_by = models.ForeignKey(
        User,
        related_name='item_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
         ,null=True
    )
    item_code = models.CharField(max_length=50, unique=True)  # Unique code for the item
    name = models.CharField(max_length=255)  # Name of the item
    brand = models.CharField(max_length=100, blank=True, null=True)  # Brand of the item
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)  # Foreign key to Category
    quantity = models.PositiveIntegerField()  # Available stock quantity
    description = models.TextField(blank=True, null=True)  # Description of the item
    image = models.ImageField(upload_to='item_images/', blank=True, null=True)  # Item image
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Base price of the item
    profit_margin = models.DecimalField(max_digits=5, decimal_places=2)  # Profit margin
    discount_type = models.CharField(
        max_length=50, choices=[('percentage', 'Percentage'), ('fixed', 'Fixed')], blank=True, null=True
    )
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)  # Discount on the item
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # Tax percentage
    
    
    created_at = models.DateTimeField(_('created at'), auto_now_add=True,null=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True,null=True)

    def __str__(self):
        return self.name


    def __str__(self):
        return self.name
