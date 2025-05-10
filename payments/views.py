from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django.db.models import Q
from account.models import User
from payments.models import Payment, PaymentMethod, Transaction
from payments.serializers import PaymentMethodSerializer, PaymentSerializer, TransactionSerializer
# Create your views here.
class AdminPaymentMethodView(ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return PaymentMethod.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user

    
    
    
class AdminPaymentView(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Payment.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user

    
    
class AdminTransactionView(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        
        # Get all users created by the authenticated user
        created_users = User.objects.filter(created_by=user) 

        # Filter customers based on those users
        return Transaction.objects.filter(Q(created_by__in=created_users) | Q(created_by=user))
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)  # Set created_by to the current user





# Create your views here.
class PurchaseStaffPaymentMethodView(ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
    
    
    
class PurchaseStaffPaymentView(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
    
    
class PurchaseStaffTransactionView(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]





# Create your views here.
class SalesStaffPaymentMethodView(ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
    
    
    
class SalesStaffPaymentView(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
    
    
class SalesStaffTransactionView(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    # renderer_classes = [UserRenderer]  # throws error in frontend
    # permission_classes = [IsSuperAdminOrAdmin]
