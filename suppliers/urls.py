from rest_framework.routers import DefaultRouter
from .views import AdminSupplierView

router = DefaultRouter()

router.register(r'suppliers', AdminSupplierView, basename='suppliers')

urlpatterns = router.urls
