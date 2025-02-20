from rest_framework.routers import DefaultRouter
from .views import AdminCustomerView, SaleStaffCustomerView

router = DefaultRouter()

router.register(r'admin-customers', AdminCustomerView, basename="admin-customers")
router.register(r'sale-staff-customers', SaleStaffCustomerView, basename="sale-staff-customers")
 
urlpatterns = router.urls
