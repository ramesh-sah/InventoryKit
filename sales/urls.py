from rest_framework.routers import DefaultRouter

from sales.views import AdminSaleItemView, AdminSaleView, SaleStaffSaleItemView, SaleStaffSaleView


router = DefaultRouter()

router.register(r'admin-sale', AdminSaleView, basename='admin-sale')
router.register(r'admin-sale-item', AdminSaleItemView, basename='admin-sale-item')


router.register(r'sale-staff-sale', SaleStaffSaleView, basename='sale-staff-sale')
router.register(r'sale-staff-sale-item', SaleStaffSaleItemView, basename='sale-staff-sale-item')

urlpatterns = router.urls
