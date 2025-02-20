from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from .manager import UserManager
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class User(AbstractBaseUser):
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(_('full name'), max_length=255)
    role = models.CharField(
        _('role'),
        max_length=50,
        choices=[
            ('super-admin', 'super-admin'),
            ('admin', 'admin'),
            ('purchase-staff', 'purchase-staff'),
            ('sales-staff', 'sales-staff'),
        ],
        default='sales-staff',
    )
    mobile_phone =  PhoneNumberField(region='NP')  # Optional: Specify default region
    address_line_1 = models.CharField(_('address line 1'), max_length=255, blank=True, null=True)
    address_line_2 = models.CharField(_('address line 2'), max_length=255, blank=True, null=True)
    city = models.CharField(_('city'), max_length=255, blank=True, null=True)
    state = models.CharField(_('state/province'), max_length=255, blank=True, null=True)
    zip_code = models.CharField(_('zip/postal code'), max_length=20, blank=True, null=True)
    country = models.CharField(_('country'), max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(
        _('profile picture'), upload_to='profile_pictures/', blank=True, null=True
    )
    date_of_birth = models.DateField(_('date of birth'), blank=True, null=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('superuser status'), default=False)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    created_by = models.CharField(max_length=255,null=True,default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role', 'mobile_phone', 'city', 'state', 'country', 'date_of_birth']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
    
class StaffCounts(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="staff_counts")
    purchase_staff_count = models.IntegerField(default=0)
    sales_staff_count = models.IntegerField(default=0)

