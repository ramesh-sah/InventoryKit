from django.contrib import admin
from django.urls import path
from account.views import UserLogout, SendPasswordResetEmailView, UserPasswordResetView, UserRegisterationView, \
    UserLoginView, UserProfileView, UserChangePasswordView

urlpatterns = [
    path('register/', UserRegisterationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('profile/', UserProfileView.as_view()),
    path('changePassword/', UserChangePasswordView.as_view()),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('logout/', UserLogout.as_view()),

]
