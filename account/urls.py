# from django.contrib import admin
# from django.urls import path
# from account.views import AdminPurchaseStaffView, AdminSaleStaffView, UserLogout, SendPasswordResetEmailView, UserPasswordResetView, UserRegisterationView, \
#     UserLoginView, UserProfileView, UserChangePasswordView

# urlpatterns = [
    
#     #common routes for all type of user superadmin , admin , purchasestaff ,salesstaff
#     path('register/', UserRegisterationView.as_view()),
#     path('login/', UserLoginView.as_view()),
#     path('profile/', UserProfileView.as_view()),
#     path('changePassword/', UserChangePasswordView.as_view()),
#     path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
#     path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
#     path('logout/', UserLogout.as_view()), 

# ]

# from rest_framework.routers import DefaultRouter


# router = DefaultRouter()

# router.register(r'admin-purchase-staff/', AdminPurchaseStaffView, basename="admin-purchase-staff")
# router.register(r'admin-sale-staff/', AdminSaleStaffView, basename="admin-sale-staff")
 
# urlpatterns = router.urls



    
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path
from account.views import AdminPurchaseStaffView, AdminSaleStaffView, AdminStaffCountView, UserLogout, SendPasswordResetEmailView, UserPasswordResetView, UserRegisterationView, \
    UserLoginView, UserProfileView, UserChangePasswordView

# User-related routes (common to all user types)
urlpatterns = [
    path('register/', UserRegisterationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('profile/', UserProfileView.as_view()),
    path('changePassword/', UserChangePasswordView.as_view()),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('logout/', UserLogout.as_view()),
    path('admin-staff-count/', AdminStaffCountView.as_view(), name='admin-staff-count'),
]




# Router to handle API routes for Admin purchase and sale staff
router = DefaultRouter()
router.register(r'admin-purchase-staff', AdminPurchaseStaffView, basename="admin-purchase-staff")
router.register(r'admin-sale-staff', AdminSaleStaffView, basename="admin-sale-staff")

# Combine the common user routes and the router-generated API routes
urlpatterns += router.urls
