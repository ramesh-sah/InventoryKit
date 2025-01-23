from rest_framework import permissions


class IsSuperAdminOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow access to super-admin and admin users.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and has a role
        user = request.user
        if user.is_authenticated:
            # Check if the user has a role of 'super-admin' or 'admin'
            if user.role in ['super-admin', 'admin']:
                return True
        return False


class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow access to super-admin and admin users.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and has a role
        user = request.user
        if user.is_authenticated:
            # Check if the user has a role of 'super-admin' or 'admin'
            if user.role == 'admin':
                return True
        return False


class IsPurchaseStaff(permissions.BasePermission):
    """
    Custom permission to only allow access to purchase-staff users.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and has a role of 'purchase-staff'
        user = request.user
        if user.is_authenticated and user.role == 'purchase-staff':
            return True
        return False


class IsSalesStaff(permissions.BasePermission):
    """
    Custom permission to only allow access to sales staff users.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and has a role of 'Sales Staff'
        user = request.user
        if user.is_authenticated and user.role == 'Sales Staff':
            return True
        return False
