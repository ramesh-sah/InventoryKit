from rest_framework.routers import DefaultRouter
from .views import AdminSupplierView, PurchaseStaffSuppliersView

router = DefaultRouter()

router.register(r'admin-suppliers', AdminSupplierView, basename='admin-suppliers')
router.register(r'purchase-staff-suppliers', PurchaseStaffSuppliersView, basename='purchase-staff-suppliers')

urlpatterns = router.urls
