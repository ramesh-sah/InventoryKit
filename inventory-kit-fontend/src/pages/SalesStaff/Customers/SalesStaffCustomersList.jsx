




import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import {
  Button,
  Menu,
  MenuItem,
  Snackbar,
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, Container
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import TouchAppIcon from '@mui/icons-material/TouchApp';

import { ListItemIcon, ListItemText } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Box } from '@mui/material';
import AdminDeleteCustomersService from './../../../services/AdminServices/AdminDeleteCustomersService';
import AdminUpdateCustomersService from './../../../services/AdminServices/AdminUpdateCustomersService';
import SalesStaffViewCustomersService from './../../../services/salesStaffServices/SalesStaffViewCustomersService';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminCustomersList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone_number: '',
    email: '',
    shipping_address: ''
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const customers = await SalesStaffViewCustomersService.fetchCustomers();
        const formattedData = customers.map((customer) => ({
          id: customer.id || 'N/A',
          createdBy: customer.created_by?.name || 'N/A',
          customerName: customer.name || 'N/A',
          email: customer.email || 'N/A',
          phoneNumber: customer.phone_number || 'N/A',
          shippingAddress: customer.shipping_address || 'N/A',
          createdAt: customer.created_at || 'N/A',
          updatedAt: customer.updated_at || 'N/A',
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

  const handleMenuClick = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
  };

  const handleUpdateOpen = () => {
    if (selectedCustomer) {
      setFormData({
        id: selectedCustomer.id,
        name: selectedCustomer.customerName,
        email: selectedCustomer.email,
        phone_number: selectedCustomer.phoneNumber,
        shipping_address: selectedCustomer.shippingAddress,
      });
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleUpdateClose = () => {
    setOpenDialog(false);
    setSelectedCustomer(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async () => {
    console.log('Updating customer:', formData);
    await AdminUpdateCustomersService.AdminUpdateCustomers(formData, formData.id);


    setSnackbarMessage(`Updated customer: ${formData.name}`);
    setOpenSnackbar(true);
    handleUpdateClose();
  };





  const handleDelete = async () => {
    if (selectedCustomer) {
      console.log('Deleting customer with ID:', selectedCustomer.id);


      await AdminDeleteCustomersService.AdminDeleteCustomers(selectedCustomer.id); // Call the service


      setSnackbarMessage(`Deleted customer with ID: ${selectedCustomer.id}`);
      setOpenSnackbar(true);
      setRows((prevRows) => prevRows.filter((row) => row.id !== selectedCustomer.id));
    }
    handleMenuClose();
  };

  const exportToCSV = () => {
    const csvData = rows.map(({ id, ...rest }) => rest);
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'customers.csv');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
    XLSX.writeFile(workbook, 'customers.xlsx');
  };

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
    saveAs(blob, 'customers.json');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'createdBy', headerName: 'Created By (Name)', width: 160 },
    { field: 'customerName', headerName: 'Customer Name', width: 160 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 160 },
    { field: 'shippingAddress', headerName: 'Shipping Address', width: 200 },
    { field: 'createdAt', headerName: 'createdAt', width: 200 },
    { field: 'updatedAt', headerName: 'updatedAt', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200, // Increased width for actions
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleMenuClick(e, params.row)}
          startIcon={<TouchAppIcon />}
        >
          Actions
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Container maxWidth="lg" sx={{ margin: '20px auto' }}>
        <Grid container spacing={2} justifyContent="left">
          <Grid item xs={4} sm="auto">
            <Button
              variant="contained"
              color="success"
              onClick={exportToCSV}
              sx={{ width: '100%' }}
              startIcon={<CloudDownloadIcon />}
            >
              Export CSV
            </Button>
          </Grid>
          <Grid item xs={4} sm="auto">
            <Button
              variant="contained"
              color="success"
              onClick={exportToExcel}
              sx={{ width: '100%' }}
              startIcon={<CloudDownloadIcon />}
            >
              Export Excel
            </Button>
          </Grid>
          <Grid item xs={4} sm="auto">
            <Button
              variant="contained"
              color="success"
              onClick={exportToJSON}
              sx={{ width: '100%' }}
              startIcon={<CloudDownloadIcon />}

            >
              Export JSON

            </Button>
          </Grid>
        </Grid>
      </Container>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            padding: 0,
          },
        }}
      >
        <MenuItem onClick={handleUpdateOpen}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Update" />
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>




      <Dialog
        open={openDialog}
        onClose={handleUpdateClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,

          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: '#1976d2' }}>
          Update Customer
        </DialogTitle>

        <DialogContent sx={{ paddingTop: 2 }}>
          <Box component="form" noValidate autoComplete="off">



            <TextField
              margin="dense"
              label="Enter  Name"
              type="text"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              type="text"
              fullWidth
              name="phone_number"
              value={formData.phone_number}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Shipping Address"
              type="text"
              fullWidth
              name="shipping_address"
              value={formData.shipping_address}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
          <Button
            onClick={handleUpdateClose}
            variant="outlined"
            color="error"
            sx={{
              minWidth: '120px',
              padding: '8px 16px',
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            color="primary"
            sx={{
              minWidth: '120px',
              padding: '8px 16px',
              borderRadius: 2,
              marginLeft: 2,
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>;

    </Paper>
  );
}

