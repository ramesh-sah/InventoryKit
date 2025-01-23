from rest_framework.routers import DefaultRouter
from .views import AdminExpenseListView, AdminExpenseCategoryListView

router = DefaultRouter()
router.register(r'expense-categories', AdminExpenseCategoryListView, basename='categories')
router.register(r'expense', AdminExpenseListView, basename='expense')


urlpatterns = router.urls

