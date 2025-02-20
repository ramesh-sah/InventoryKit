from rest_framework.routers import DefaultRouter
from .views import AdminReportViewSet, PurchaseStaffReportViewSet, SaleStaffReportViewSet

router = DefaultRouter()

router.register(r'admin-report', AdminReportViewSet, basename='admin-report')

router.register(r'purchase-staff-report', PurchaseStaffReportViewSet, basename='purchase-staff-report')


router.register(r'sale-staff-report', SaleStaffReportViewSet, basename='sale-staff-report')
urlpatterns = router.urls

