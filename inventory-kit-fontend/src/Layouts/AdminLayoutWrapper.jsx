import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Outlet } from 'react-router-dom';
import Theme from './../config/Theme/Theme';
import CustomRouterHook from '../hooks/CustomRouterHook';
import NAVIGATION from './../components/Sidebar/AdminSidebar';
import AdminNavbar from '../components/Navbar/AdminNavbar';



export default function PurchaseStaffLayoutWrapper(props) {
  const router = CustomRouterHook();

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={Theme}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "InventoryKit",
        homeUrl: "/toolpad/core/introduction",
      }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: AdminNavbar, // Updated toolbar actions
        }}
      >
        <PageContainer>
          <Grid container spacing={1}>
            <Outlet />
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
