from rest_framework.routers import DefaultRouter

from expenses.views import AdminExpenseCategoryView, AdminExpenseView, PurchaseStaffExpenseCategoryView, PurchaseStaffExpenseView, SalesStaffExpenseCategoryView, SalesStaffExpenseView


router = DefaultRouter()


router.register(r'admin-expense-categories', AdminExpenseCategoryView, basename='admin-expenses-category')
router.register(r'admin-expense', AdminExpenseView, basename='admin-expense')



router.register(r'purchase-staff-expense-categories', PurchaseStaffExpenseCategoryView, basename='purchase-staff-expenses-category')
router.register(r'purchase-staff-expense', PurchaseStaffExpenseView, basename='purchase-staff-expense')



router.register(r'sales-staff-expense-categories', SalesStaffExpenseCategoryView, basename='sales-staff-expenses-category')
router.register(r'sales-staff-expense', SalesStaffExpenseView, basename='sales-staff-expense')


urlpatterns = router.urls

