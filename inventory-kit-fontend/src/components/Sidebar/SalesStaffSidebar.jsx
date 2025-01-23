
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InventoryIcon from '@mui/icons-material/Inventory';
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
    title: 'Sales Menu',
  },
  {
    segment: 'sales-dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />, // Perfect for a "Dashboard" view

  },
  {
    segment: 'sales',
    title: 'Sales',
    icon: <ShoppingCartIcon />, // Represents purchases or shopping
    children: [
      {
        segment: 'new-sales',
        title: 'New Sales',
        icon: <AddShoppingCartIcon />, // Indicates adding a new purchase
      },
      {
        segment: 'sales-list',
        title: 'Sales List',
        icon: <ListAltIcon />, // Represents a list of items
      },
    ],
  },
  {
    segment: 'sale-customers',
    title: 'Customers',
    icon: <BusinessIcon />, // Symbolizes organizations or suppliers
    children: [
      {
        segment: 'new-customer',
        title: 'New Customers',
        icon: <PersonAddAltIcon />, // Suggests adding new contacts
      },
      {
        segment: 'customers-list',
        title: 'Customers List',
        icon: <FormatListBulletedIcon />, // Represents a list of items or suppliers
      },
    ],
  },
  {
    segment: 'sale-items',
    title: 'Items',
    icon: <InventoryIcon />, // Best choice for managing inventory or items
    children: [
    
      {
        segment: 'item-list',
        title: 'Item List',
        icon: <ListAltIcon />, // Depicts a detailed list view
      },
    ],
  },
  {
    segment: 'sale-expenses',
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
    segment: 'sale-reports',
    title: 'Reports',
    icon: <AssessmentIcon />, // Represents analytics or reports
    children: [
      {
        segment: 'sales-report',
        title: 'Sales Report',
        icon: <BarChartIcon />, // Fits a reporting context with charts
      },
      {
        segment: 'sales-payment',
        title: 'Sales Payment Report',
        icon: <ReceiptIcon />, // Represents financial documentation
      },
    ],
  },
];

export default NAVIGATION;