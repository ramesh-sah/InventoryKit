from rest_framework.routers import DefaultRouter
from .views import AdminCategoryView, AdminItemsView, PurchaseStaffCategoryView, PurchaseStaffItemsView, SaleStaffCategoryView, SaleStaffItemsView

router = DefaultRouter()
router.register(r'admin-item-categories', AdminCategoryView, basename='admin-item-category')
router.register(r'admin-items', AdminItemsView, basename='admin-items')



router.register(r'purchase-staff-item-categories', PurchaseStaffCategoryView, basename='purchase-staff-item-category')
router.register(r'purchase-staff-items', PurchaseStaffItemsView, basename='purchase-staff-items')




router.register(r'sale-staff-item-categories', SaleStaffCategoryView, basename='sale-staff-item-category')
router.register(r'sale-staff-items', SaleStaffItemsView, basename='sale-staff-items')

urlpatterns = router.urls
