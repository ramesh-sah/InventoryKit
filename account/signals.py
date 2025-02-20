# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, StaffCounts

@receiver(post_save, sender=User)
def update_admin_staff_counts(sender, instance, created, **kwargs):
    """Update the counts of purchase and sales staff whenever a new user is created."""
    if created:
        # Get or create the staff counts for the user who created the new user
        staff_counts, created = StaffCounts.objects.get_or_create(user=instance.created_by)

        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=instance.created_by)

        # Count the number of purchase and sales staff
        purchase_staff_count = created_users.filter(role='purchase-staff').count()
        sales_staff_count = created_users.filter(role='sales-staff').count()

        # Update the counts in the database
        staff_counts.purchase_staff_count = purchase_staff_count
        staff_counts.sales_staff_count = sales_staff_count
        staff_counts.save()

        # Log the updated counts for debugging
        # print(f'Updated User Staff Counts for {instance.created_by}: {staff_counts.__dict__}')



@receiver(post_save, sender=User)
def update_super_admin_staff_counts(sender, instance, created, **kwargs):
    """Update the counts of purchase and sales staff whenever a new user is created."""
    if created:
        # Get or create the staff counts for the user who created the new user
        staff_counts, created = StaffCounts.objects.get_or_create(user=instance.created_by)

        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=instance.created_by)

        # Count the number of purchase and sales staff
        purchase_staff_count = created_users.filter(role='purchase-staff').count()
        sales_staff_count = created_users.filter(role='sales-staff').count()

        # Update the counts in the database
        staff_counts.purchase_staff_count = purchase_staff_count
        staff_counts.sales_staff_count = sales_staff_count
        staff_counts.save()

        # Log the updated counts for debugging
        # print(f'Updated User Staff Counts for {instance.created_by}: {staff_counts.__dict__}')