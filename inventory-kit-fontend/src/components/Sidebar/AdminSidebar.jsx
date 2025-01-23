import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InventoryIcon from '@mui/icons-material/Inventory';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Admin Menu',
  },
  {
    segment: 'admin-dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />, // Perfect for a "Dashboard" view
  },
  {
    segment: 'admin-customers',
    title: 'Customers',
    icon: <PersonAddAltIcon />, // Updated for Customers
    children: [
      {
        segment: 'new-customers',
        title: 'New Customers',
        icon: <PersonAddAltIcon />, // Updated icon for New Customers
      },
      {
        segment: 'customers-list',
        title: 'Customers List',
        icon: <FormatListBulletedIcon />, // Updated icon for Customers List
      },
    ],
  },
  {
    segment: 'admin-purchase-staff',
    title: 'Purchase Staff',
    icon: <BusinessIcon />, // Updated for Purchase Staff
    children: [
      {
        segment: 'new-purchase-staff',
        title: 'New Purchase Staff',
        icon: <PersonAddAltIcon />, // Updated icon for New Purchase Staff
      },
      {
        segment: 'purchase-staff-list',
        title: 'Purchase Staff List',
        icon: <FormatListBulletedIcon />, // Updated icon for Purchase Staff List
      },
    ],
  },
  {
    segment: 'admin-sale-staff',
    title: 'Sale Staff',
    icon: <InventoryIcon />, // Updated for Sale Staff
    children: [
      {
        segment: 'new-sale-staff',
        title: 'New Sale Staff',
        icon: <AddShoppingCartIcon />, // Updated icon for New Sale Staff
      },
      {
        segment: 'sale-staff-list',
        title: 'Sale Staff List',
        icon: <ListAltIcon />, // Updated icon for Sale Staff List
      },
    ],
  },
  {
    segment: 'admin-suppliers',
    title: 'Suppliers',
    icon: <CategoryIcon />, // Updated for Suppliers
    children: [
      {
        segment: 'new-suppliers',
        title: 'New Suppliers',
        icon: <PostAddIcon />, // Updated icon for New Suppliers
      },
      {
        segment: 'suppliers-list',
        title: 'Suppliers List',
        icon: <FormatListBulletedIcon />, // Updated icon for Suppliers List
      },
    ],
  },
  {
    segment: 'admin-expenses',
    title: 'Expenses',
    icon: <MonetizationOnIcon />, // Represents financial transactions or expenses
    children: [
      {
        segment: 'new-expenses',
        title: 'New Expenses',
        icon: <AddCircleOutlineIcon />, // Indicates adding new expenses
      },
      {
        segment: 'expenses-list',
        title: 'Expenses List',
        icon: <ListAltIcon />, // Indicates a list view
      },
      {
        segment: 'expenses-category',
        title: 'New Expenses Category',
        icon: <CategoryIcon />, // Suggests categorization
      },
      {
        segment: 'expenses-category-list',
        title: 'Expenses Category List',
        icon: <FormatListBulletedIcon />, // Another list representation
      },
    ],
  },
  {
    segment: 'admin-items',
    title: 'Items',
    icon: <InventoryIcon />, // Best choice for managing inventory or items
    children: [
      {
        segment: 'new-item',
        title: 'New Item',
        icon: <PostAddIcon />, // Represents adding a new item
      },
      {
        segment: 'item-list',
        title: 'Item List',
        icon: <ListAltIcon />, // Depicts a detailed list view
      },
    ],
  },
  {
    segment: 'admin-purchase',
    title: 'Purchase',
    icon: <ShoppingCartIcon />, // Represents purchases or shopping
    children: [
      {
        segment: 'new-purchase',
        title: 'New Purchase',
        icon: <AddShoppingCartIcon />, // Indicates adding a new purchase
      },
      {
        segment: 'purchase-list',
        title: 'Purchase List',
        icon: <ListAltIcon />, // Represents a list of items
      },
    ],
  },
  {
    segment: 'admin-purchase-staff',
    title: 'Purchase Staff',
    icon: <ShoppingCartIcon />, // Represents purchases or shopping
    children: [
      {
        segment: 'new-purchase-staff',
        title: 'New Purchase Staff',
        icon: <AddShoppingCartIcon />, // Indicates adding a new purchase
      },
      {
        segment: 'purchase-staff-list',
        title: 'Purchase Staff List',
        icon: <ListAltIcon />, // Represents a list of items
      },
    ],
  },
  {
    segment: 'admin-reports',
    title: 'Reports',
    icon: <AssessmentIcon />, // Represents analytics or reports
    children: [
      {
        segment: 'purchase-report',
        title: 'Purchase Report',
        icon: <BarChartIcon />, // Fits a reporting context with charts
      },
      {
        segment: 'purchase-payment-report',
        title: 'Purchase Payment Report',
        icon: <ReceiptIcon />, // Represents financial documentation
      },
      {
        segment: 'sales-report',
        title: 'Sales Report',
        icon: <BarChartIcon />, // Fits a reporting context with charts
      },
      {
        segment: 'sales-payment-report',
        title: 'Sales Payment Report',
        icon: <ReceiptIcon />, // Represents financial documentation
      },
    ],
  },
];

export default NAVIGATION;
