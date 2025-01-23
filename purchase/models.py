from django.core.exceptions import ValidationError
from django.db import models
from django.conf import settings
from suppliers.models import Supplier
from items.models import Item, Category


# Purchase Model
class Purchase(models.Model):
    STATUS_CHOICES = [
        ('received', 'Received'),
        ('pending', 'Pending'),
        ('ordered', 'Ordered'),
    ]

    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    purchase_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reference_no = models.CharField(max_length=50, unique=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def subtotal(self):
        return sum(item.total_price for item in self.items.all())

    @property
    def total_tax(self):
        return sum(item.tax_amount for item in self.items.all())

    @property
    def grand_total(self):
        return self.subtotal + self.total_tax

    def __str__(self):
        return f"Purchase {self.reference_no} (Supplier: {self.supplier.name})"


# Purchase Item Model
class PurchaseItem(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, related_name='items')
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)

    def save(self, *args, **kwargs):
        # Validate item-category relationship
        if self.item and self.category:
            if self.item.category != self.category:
                raise ValidationError(
                    f"The item '{self.item.name}' does not belong to the selected category '{self.category.name}'."
                )

        # Calculate tax amount and total price
        self.tax_amount = (
            (self.price_per_unit * self.quantity * self.tax_percentage / 100) if self.tax_percentage else 0.0
        )
        self.total_price = (self.price_per_unit * self.quantity) + self.tax_amount
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Item {self.item.name} (Quantity: {self.quantity})"
