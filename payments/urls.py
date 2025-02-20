from rest_framework.routers import DefaultRouter

from payments.views import AdminPaymentMethodView, AdminPaymentView, AdminTransactionView, PurchaseStaffPaymentMethodView, PurchaseStaffPaymentView, PurchaseStaffTransactionView, SalesStaffPaymentMethodView, SalesStaffPaymentView, SalesStaffTransactionView


router = DefaultRouter()

router.register(r'admin-payment-method', AdminPaymentMethodView, basename='admin-payment-method')
router.register(r'admin-payment', AdminPaymentView, basename='admin-payment')
router.register(r'admin-transaction', AdminTransactionView, basename='admin-transaction')



router.register(r'purchase-staff-payment-method', PurchaseStaffPaymentMethodView, basename='purchase-staff-payment-method')
router.register(r'purchase-staff-payment', PurchaseStaffPaymentView, basename='purchase-staff-payment')
router.register(r'purchase-staff-transaction', PurchaseStaffTransactionView, basename='purchase-staff-transaction')



router.register(r'sale-staff-payment-method', SalesStaffPaymentMethodView, basename='sale-staff-payment-method')
router.register(r'sale-staff-payment', SalesStaffPaymentView, basename='sale-staff-payment')
router.register(r'sale-staff-transaction', SalesStaffTransactionView, basename='sale-staff-transaction')



urlpatterns = router.urls
