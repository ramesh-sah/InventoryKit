from rest_framework.routers import DefaultRouter
from .views import AdminSaleView, AdminItemSaleView

router = DefaultRouter()

router.register(r'admin-sale-view', AdminSaleView, basename='admin-sale-view')
router.register(r'admin-item-sale-view', AdminItemSaleView, basename='admin-item-sale-view')

urlpatterns = router.urls
