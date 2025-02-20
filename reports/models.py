from django.db import models

from django.utils import timezone

from account.models import User

from django.utils.translation import gettext_lazy as _

class Report(models.Model):
    
    
    REPORT_TYPE_CHOICES = [
        ('purchase', 'Purchase Report'),
        ('sales', 'Sales Report'),
        ('expense', 'Expense Report'),
        ('inventory', 'Inventory Report'),
        ('tax', 'Tax Report'),
        # Add more report types as needed
    ]

    created_by = models.ForeignKey(
        User,
        related_name='report_created',
        on_delete=models.CASCADE  # Delete customers if the user is deleted
         ,null=True
    )
    # Report metadata
    report_type = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES)
    start_date = models.DateField()  # Start date for the report period
    end_date = models.DateField()  # End date for the report period
    generated_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the report was generated
    total_amount = models.DecimalField(max_digits=12, decimal_places=2,default=0.0)  # Total amount in the report (calculated)
    notes = models.TextField(blank=True, null=True)  # Any additional notes or comments
    file = models.FileField(upload_to='reports/', blank=True, null=True)  # If a file (PDF, Excel, etc.) is generated
    created_at = models.DateTimeField(_('created at'), auto_now_add=True,null=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True, null=True)

    def __str__(self):
        return f"{self.get_report_type_display()} Report from {self.start_date} to {self.end_date}"

    class Meta:
        ordering = ['-generated_at']  # Order reports by most recent first

    def generate_report(self):
        """
        A method to generate the report data, calculate totals, etc.
        Can be customized per report type (e.g., purchase report, sales report).
        """
        if self.report_type == 'purchase':
            # Example: Summarize purchase totals, tax, etc.
            self.total_amount = self.calculate_purchase_totals()
        elif self.report_type == 'sales':
            # Example: Summarize sales totals, tax, etc.
            self.total_amount = self.calculate_sales_totals()
        elif self.report_type == 'expense':
            # Example: Summarize expenses, tax, etc.
            self.total_amount = self.calculate_expense_totals()
        # Add other report calculations as needed

        self.save()

    def calculate_purchase_totals(self):
        # This is a placeholder function. Replace with actual logic to calculate purchase totals.
        # For example: sum of all purchases in the given period.
        return 0.0

    def calculate_sales_totals(self):
        # This is a placeholder function. Replace with actual logic to calculate sales totals.
        # For example: sum of all sales in the given period.
        return 0.0

    def calculate_expense_totals(self):
        # This is a placeholder function. Replace with actual logic to calculate expense totals.
        # For example: sum of all expenses in the given period.
        return 0.0
