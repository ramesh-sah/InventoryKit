from rest_framework.routers import DefaultRouter
from .views import AdminCategoryView, AdminItemsView

router = DefaultRouter()
router.register(r'categories', AdminCategoryView, basename='category')
router.register(r'items', AdminItemsView, basename='items')

urlpatterns = router.urls
