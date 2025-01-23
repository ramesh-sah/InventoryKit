
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import SalesStaffViewCustomersService from './../../../services/salesStaffServices/SalesStaffViewCustomersService';



export default function SalesStaffCustomersList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await SalesStaffViewCustomersService.fetchCustomers();
        const formattedData = customers.map((customer, index) => ({
          id: index + 1, // Assign unique IDs for DataGrid
          firstName: customer.created_by?.name || 'N/A',
          lastName: customer.name || 'N/A',
          email: customer.email || 'N/A',
          phoneNumber: customer.phone_number || 'N/A',
          shippingAddress: customer.shipping_address || 'N/A',
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Failed to fetch customers:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Created By (Name)', width: 160 },
    { field: 'lastName', headerName: 'Customer Name', width: 160 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 160 },
    { field: 'shippingAddress', headerName: 'Shipping Address', width: 200 },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10,50,100]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
