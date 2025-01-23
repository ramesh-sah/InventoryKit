from rest_framework.routers import DefaultRouter
from .views import AdminReportViewSet

router = DefaultRouter()

router.register(r'report', AdminReportViewSet, basename='report')

urlpatterns = router.urls

