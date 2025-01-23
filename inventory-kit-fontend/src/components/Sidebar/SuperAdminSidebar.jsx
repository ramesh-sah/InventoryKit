
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
    title: 'SuperAdmin Menu',
  },
  {
    segment: 'super-admin-dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />, // Perfect for a "Dashboard" view

  },
  {
    segment: 'super-admin',
    title: 'Admin',
    icon: <ShoppingCartIcon />, // Represents purchases or shopping
    children: [
      {
        segment: 'new-admin',
        title: 'New Admin',
        icon: <AddShoppingCartIcon />, // Indicates adding a new purchase
      },
      {
        segment: 'admin-list',
        title: 'Admin List',
        icon: <ListAltIcon />, // Represents a list of items
      },
    ],
  },
  {
    segment: 'super-admin-purchase',
    title: 'Purchase',
    icon: <ShoppingCartIcon />, // Represents purchases or shopping
    children: [
      {
        segment: 'new-purchase-Staff',
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
    segment: 'super-admin-sale',
    title: 'Sale ',
    icon: <ShoppingCartIcon />, // Represents purchases or shopping
    children: [
      {
        segment: 'new-sale-staff',
        title: 'New Sale Staff',
        icon: <AddShoppingCartIcon />, // Indicates adding a new purchase
      },
      {
        segment: 'sale-staff-list',
        title: 'Sale Staff List',
        icon: <ListAltIcon />, // Represents a list of items
      },
    ],
  },
  
];

export default NAVIGATION;