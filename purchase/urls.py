from rest_framework.routers import DefaultRouter
from .views import AdminPurchaseView, AdminPurchaseItemView

router = DefaultRouter()
router.register(r'purchase', AdminPurchaseView, basename='purchase')
router.register(r'purchase-items', AdminPurchaseItemView, basename='purchase-items')

urlpatterns = router.urls
