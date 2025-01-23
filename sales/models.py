from django.db import models
from purchase.models import PurchaseItem

# Sale Model
class Sale(models.Model):
    STATUS_CHOICES = [
        ('final', 'Final'),
        ('quotation', 'Quotation'),
    ]

    customer = models.ForeignKey('customers.Customer', on_delete=models.SET_NULL, null=True)
    sales_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='quotation')
    reference_no = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def subtotal(self):
        return sum(item.total_price for item in self.items.all())

    @property
    def total_tax(self):
        return sum(item.tax_amount for item in self.items.all())

    @property
    def total_amount(self):
        return self.subtotal + self.total_tax

    def __str__(self):
        return f"Sale {self.reference_no} (Customer: {self.customer.name})"


# Sale Item Model
class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='items')
    purchase_item = models.ForeignKey(PurchaseItem, on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)

    def save(self, *args, **kwargs):
        # Calculate tax amount and total price
        self.tax_amount = (
            (self.price_per_unit * self.quantity * self.tax_percentage / 100) if self.tax_percentage else 0.0
        )
        self.total_price = (self.price_per_unit * self.quantity - self.discount) + self.tax_amount
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Item {self.purchase_item.item.name} (Quantity: {self.quantity})"
