from rest_framework.routers import DefaultRouter
from .views import AdminPurchaseView, AdminPurchaseItemView, PurchaseStaffPurchaseItemView, PurchaseStaffPurchaseView

router = DefaultRouter()
router.register(r'admin-purchase', AdminPurchaseView, basename='admin-purchase')
router.register(r'admin-purchase-items', AdminPurchaseItemView, basename='admin-purchase-items')



router.register(r'purchase-staff-purchase', PurchaseStaffPurchaseView, basename='purchase-staff-purchase')
router.register(r'purchase-staff-purchase-items', PurchaseStaffPurchaseItemView, basename='purchase-staff-purchase-items')




urlpatterns = router.urls
