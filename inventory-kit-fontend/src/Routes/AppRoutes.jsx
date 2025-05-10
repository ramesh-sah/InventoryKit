// Import necessary components and modules from 'react-router-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../pages/Login/Login'; // Login page component
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword"; // Forget Password page component
import NotFoundPage from "../pages/error/NotFoundPage/NotFoundPage"; // 404 Error page component

import PurchaseStaffLayoutWrapper from './../Layouts/PurchaseStaffLayoutWrapper'; // Layout wrapper for Purchase Staff
import AdminLayoutWrapper from "../Layouts/AdminLayoutWrapper"; // Layout wrapper for Admin
import SuperAdminLayoutWrapper from "../Layouts/SuperAdminLayoutWrapper"; // Layout wrapper for Super Admin
import SalesStaffLayoutWrapper from "../Layouts/SalesStaffLayoutWrapper"; // Layout wrapper for Sales Staff
import SuperAdminDashboard from './../pages/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard';
import AdminDashboard from './../pages/Admin/AdminDashboard/AdminDashboard';
import PurchaseStaffDashboard from './../pages/PurchaseStaff/PurchaseDashboard/PurchaseStaffDashboard';
import PurchaseStaffPurchaseAdd from './../pages/PurchaseStaff/Purchase/PurchaseStaffPurchaseAdd';
import PurchaseStaffSuppliersAdd from './../pages/PurchaseStaff/Suppliers/PurchaseStaffSuppliersAdd';
import PurchaseStaffPurchaseList from './../pages/PurchaseStaff/Purchase/PurchaseStaffPurchaseList';
import PurchaseStaffSuppliersList from "../pages/PurchaseStaff/Suppliers/PurchaseStaffSuppliersList";
import PurchaseStaffItemAdd from './../pages/PurchaseStaff/Items/PurchaseStaffItemAdd';
import PurchaseStaffItemList from "../pages/PurchaseStaff/Items/PurchaseStaffItemList";
import PurchaseStaffExpensesAdd from './../pages/PurchaseStaff/Expenses/PurchaseStaffExpensesAdd';
import PurchaseStaffExpensesList from "../pages/PurchaseStaff/Expenses/PurchaseStaffExpensesList";
import PurchaseStaffExpenseCategory from "../pages/PurchaseStaff/Expenses/PurchaseStaffExpenseCategory";
import PurchaseStaffExpenseCategoryList from "../pages/PurchaseStaff/Expenses/PurchaseStaffExpenseCategoryList";
import PurchaseStaffPurchaseReport from "../pages/PurchaseStaff/Reports/PurchaseStaffPurchaseReport";
import SalesStaffDashboard from './../pages/SalesStaff/SalesDashboard/SalesStaffDashboard';
import SalesStaffSalesAdd from './../pages/SalesStaff/Sales/SalesStaffSalesAdd';
import SalesStaffSalesList from "../pages/SalesStaff/Sales/SalesStaffSalesList";
import SalesStaffCustomersAdd from "../pages/SalesStaff/Customers/SalesStaffCustomersAdd";
import SalesStaffCustomersList from "../pages/SalesStaff/Customers/SalesStaffCustomersList";
import SalesStaffItemsList from "../pages/SalesStaff/Items/SalesStaffItemsList";
import SalesStaffExpensesAdd from "../pages/SalesStaff/Expenses/SalesStaffExpensesAdd";
import SalesStaffExpensesList from './../pages/SalesStaff/Expenses/SalesStaffExpensesList';
import SalesStaffExpenseCategory from './../pages/SalesStaff/Expenses/SalesStaffExpenseCategory';
import SalesStaffExpenseCategoryList from './../pages/SalesStaff/Expenses/SalesStaffExpenseCategoryList';
import AdminCustomersAdd from './../pages/Admin/Customers/AdminCustomersAdd';
import AdminCustomersList from './../pages/Admin/Customers/AdminCustomersList';
import AdminPurchaseStaffAdd from './../pages/Admin/PurchaseStaff/AdminPurchaseStaffAdd';
import AdminPurchaseStaffList from './../pages/Admin/PurchaseStaff/AdminPurchaseStaffList';
import AdminSalesAdd from './../pages/Admin/Sales/AdminSalesAdd';
import AdminSalesStaffAdd from './../pages/Admin/SalesStaff/AdminSalesStaffAdd';
import AdminSalesStaffList from './../pages/Admin/SalesStaff/AdminSalesStaffList';
import AdminSuppliersAdd from './../pages/Admin/Suppliers/AdminSuppliersAdd';
import AdminSuppliersList from './../pages/Admin/Suppliers/AdminSuppliersList';
import AdminExpensesAdd from './../pages/Admin/Expenses/AdminExpensesAdd';
import AdminExpensesList from './../pages/Admin/Expenses/AdminExpensesList';
import AdminExpenseCategory from './../pages/Admin/Expenses/AdminExpenseCategory';
import AdminExpenseCategoryList from './../pages/Admin/Expenses/AdminExpenseCategoryList';
import AdminItemAdd from './../pages/Admin/Items/AdminItemAdd';
import AdminItemList from './../pages/Admin/Items/AdminItemList';
import AdminPurchaseAdd from './../pages/Admin/Purchase/AdminPurchaseAdd';
import AdminPurchaseList from './../pages/Admin/Purchase/AdminPurchaseList';
import AdminPurchaseReport from './../pages/Admin/Reports/AdminPurchaseReport';
import AdminPurchasePaymentReport from './../pages/Admin/Reports/AdminPurchasePaymentReport';
import AdminSalesReport from './../pages/Admin/Reports/AdminSalesReport';
import AdminSalesPaymentReport from './../pages/Admin/Reports/AdminSalesPaymentReport';
import SuperAdminAddAdmin from "../pages/SuperAdmin/Admin/SuperAdminAddAdmin";
import SuperAdminListAdmin from "../pages/SuperAdmin/Admin/SuperAdminListAdmin";
import SuperAdminSalesStaffAdd from './../pages/SuperAdmin/SalesStaff/SuperAdminSalesStaffAdd';
import SuperAdminPurchaseStaffAdd from './../pages/SuperAdmin/PurchaseStaff/SuperAdminPurchaseStaffAdd';
import SuperAdminPurchaseStaffList from './../pages/SuperAdmin/PurchaseStaff/SuperAdminPurchaseStaffList';

import SuperAdminSalesStaffList from './../pages/SuperAdmin/SalesStaff/SuperAdminSalesStaffList';
import SalesStaffSalesReport from './../pages/SalesStaff/Reports/SalesStaffSalesReport';
import SalesStaffSalesPaymentReport from './../pages/SalesStaff/Reports/SalesStaffSalesPaymentReport';
import AdminSalesList from './../pages/Admin/Sales/AdminSalesList';


/**
 * AppRoutes Component
 * Defines all the routes and their corresponding components, wrapped with appropriate layout wrappers.
 */




const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/forgot-password" element={<ForgetPassword />} />
                
                <Route index element={<Login />} />


                {/* Super Admin Routes */}
                <Route element={<SuperAdminLayoutWrapper />}>
                    {/* Super Admin-specific dashboard route */}
                    <Route path="/super-admin-dashboard" element={<SuperAdminDashboard/>} />
                    <Route path="/super-admin/new-admin" element={<SuperAdminAddAdmin />} />
                    <Route path="/super-admin/admin-list" element={<SuperAdminListAdmin />} />
                    <Route path="/super-admin-purchase/new-purchase-staff" element={<SuperAdminPurchaseStaffAdd />} />
                    <Route path="/super-admin-purchase/purchase-staff-list" element={<SuperAdminPurchaseStaffList />} />
                    <Route path="/super-admin-sale/new-sale-staff" element={<SuperAdminSalesStaffAdd />} />
                    <Route path="/super-admin-sale/sale-staff-list" element={<SuperAdminSalesStaffList/>} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminLayoutWrapper />}>
                    {/* Admin-specific dashboard route */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-customers/new-customers" element={<AdminCustomersAdd />} />
                    <Route path="/admin-customers/customers-list" element={<AdminCustomersList />} />
                    <Route path="/admin-purchase-staff/new-purchase-staff" element={<AdminPurchaseStaffAdd />} />
                    <Route path="/admin-purchase-staff/purchase-staff-list" element={<AdminPurchaseStaffList />} />
                    <Route path="/admin-sale-staff/new-sale-staff" element={<AdminSalesStaffAdd />} />
                    <Route path="/admin-sale-staff/sale-staff-list" element={<AdminSalesStaffList/>} />
                    <Route path="/admin-suppliers/new-suppliers" element={<AdminSuppliersAdd />} />
                    <Route path="/admin-suppliers/suppliers-list" element={<AdminSuppliersList />} />
                    <Route path="/admin-expenses/new-expenses" element={<AdminExpensesAdd />} />
                    <Route path="/admin-expenses/expenses-list" element={<AdminExpensesList />} />
                    <Route path="/admin-expenses/expenses-category" element={<AdminExpenseCategory />} />
                    <Route path="/admin-expenses/expenses-category-list" element={<AdminExpenseCategoryList />} />


                    <Route path="/admin-sales/new-sales" element={<AdminSalesAdd />} />
                    <Route path="/admin-sales/sales-list" element={<AdminSalesList />} />
                    <Route path="/admin-items/new-item" element={<AdminItemAdd />} />
                    <Route path="/admin-items/item-list" element={<AdminItemList />} />
                    <Route path="/admin-purchase/new-purchase" element={<AdminPurchaseAdd />} />
                    <Route path="/admin-purchase/purchase-list" element={<AdminPurchaseList />} />
                    <Route path="/admin-reports/purchase-report" element={<AdminPurchaseReport />} />
                    <Route path="/admin-reports/purchase-payment-report" element={<AdminPurchasePaymentReport />} />
                    <Route path="/admin-reports/sales-report" element={<AdminSalesReport />} />
                    <Route path="/admin-reports/sales-payment-report" element={<AdminSalesPaymentReport />} />




                </Route>

                {/* Purchase Staff Routes */}
                <Route element={<PurchaseStaffLayoutWrapper />}>
                    <Route path='/purchase-dashboard' element={<PurchaseStaffDashboard />} />
                    <Route path="/purchase/new-purchase" element={<PurchaseStaffPurchaseAdd />} />
                    <Route path="/purchase/purchase-list" element={<PurchaseStaffPurchaseList />} />
                    <Route path="/suppliers/new-suppliers" element={<PurchaseStaffSuppliersAdd />} />
                    <Route path="/suppliers/suppliers-list" element={<PurchaseStaffSuppliersList />} />
                    <Route path="/purchase-items/new-item" element={<PurchaseStaffItemAdd />} />
                    <Route path="/purchase-items/item-list" element={<PurchaseStaffItemList />} />
                    <Route path="/purchase-expenses/new-expenses" element={<PurchaseStaffExpensesAdd />} />
                    <Route path="/purchase-expenses/expenses-list" element={<PurchaseStaffExpensesList />} />
                    <Route path="/purchase-expenses/expenses-category" element={<PurchaseStaffExpenseCategory />} />
                    <Route path="/purchase-expenses/expenses-category-list" element={<PurchaseStaffExpenseCategoryList />} />
                    <Route path="/purchase-reports/purchase-report" element={<PurchaseStaffPurchaseReport />} />
                    <Route path="/purchase-reports/purchase-payment-report" element={<PurchaseStaffPurchaseReport />} />
                  
                </Route>

                {/* Sales Staff Routes */}
                <Route element={<SalesStaffLayoutWrapper />}>
                    {/* Sales Staff-specific dashboard route */}
                    <Route path="/sales-dashboard" element={<SalesStaffDashboard />} />
                    <Route path="/sales/new-sales" element={<SalesStaffSalesAdd />} />
                    <Route path="/sales/sales-list" element={<SalesStaffSalesList />} />
                    <Route path="/sale-customers/new-customer" element={<SalesStaffCustomersAdd />} />
                    <Route path="/sale-customers/customers-list" element={<SalesStaffCustomersList />} />
                    <Route path="/sale-items/item-list" element={<SalesStaffItemsList />} />
                    <Route path="/sale-expenses/new-expenses" element={<SalesStaffExpensesAdd />} />
                    <Route path="/sale-expenses/expenses-list" element={<SalesStaffExpensesList />} />
                    <Route path="/sale-expenses/expenses-category" element={<SalesStaffExpenseCategory />} />
                    <Route path="/sale-expenses/expenses-category-list" element={<SalesStaffExpenseCategoryList />} />
                    <Route path="/sale-reports/sales-report" element={<SalesStaffSalesReport />} />
                    <Route path="/sale-reports/sales-payment" element={<SalesStaffSalesPaymentReport />} />
                </Route>

                {/* Catch-All Route for unmatched paths */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
