import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import PurchaseStaffSuppliersListService from '../../../services/PurchaseStaffService/PurchaseStaffSuppliersListService';


export default function PurchaseStaffSuppliersList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suppliers = await PurchaseStaffSuppliersListService.fetchSuppliers();
        const formattedData = suppliers.map((supplier, index) => ({
          id: index + 1, // Assign unique IDs for DataGrid
          createdBy: supplier.created_by?.name || 'N/A', // Updated field name
          supplierName: supplier.name || 'N/A',
          email: supplier.email || 'N/A',
          phoneNumber: supplier.phone_number || 'N/A',
          country: supplier.country || 'N/A',               // New field
          state: supplier.state || 'N/A',                   // New field
          city: supplier.city || 'N/A',                     // New field
          postalCode: supplier.postal_code || 'N/A',       // New field
          address: supplier.address || 'N/A',               // New field
          taxNo: supplier.tax_no || 'N/A',                  // New field
          gstNo: supplier.gst_no || 'N/A',                  // New field
          status: supplier.status || 'N/A',                  // New field
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Failed to fetch suppliers:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'createdBy', headerName: 'Created By', width: 160 }, // Updated field name
    { field: 'supplierName', headerName: 'Supplier Name', width: 160 }, // Updated field name
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 160 },
    { field: 'country', headerName: 'Country', width: 120 },         // New column
    { field: 'state', headerName: 'State', width: 120 },             // New column
    { field: 'city', headerName: 'City', width: 120 },               // New column
    { field: 'postalCode', headerName: 'Postal Code', width: 120 },  // New column
    { field: 'address', headerName: 'Address', width: 200 },         // New column
    { field: 'taxNo', headerName: 'Tax No', width: 120 },            // New column
    { field: 'gstNo', headerName: 'GST No', width: 120 },            // New column
    { field: 'status', headerName: 'Status', width: 120 },            // New column
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}