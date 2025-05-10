

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
import AdminItemListService from '../../../services/AdminServices/AdminItemListService';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminItemList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
   item_code:'',
   name:'',
   brand:'',
   quantity:'',
   description:'',
   price:'',
   profit_margin:'',
   discount_type:'',
   discount:'',
   tax_percentage:'',

  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const items = await AdminItemListService.fetchItem();
        console.log(items);
        const formattedData = items.map((item) => ({
          id: item.id || 'N/A',
          createdBy: item.created_by?.name || 'N/A',
          item_code:item.item_code || 'N/A',
          name: item.name || 'N/A',
          brand: item.brand || 'N/A',
          quantity: item.quantity || 'N/A',
          description: item.description || 'N/A',
          price:item.price || 'N/A',
          profit_margin:item.profit_margin || 'N/A',
          discount_type:item.discount_type || 'N/A',
          discount:item.discount || 'N/A',
          tax_percentage:item.tax_percentage || 'N/A',
          category_name:item.category?.name || 'N/A',
        
          createdAt: item.created_at || 'N/A',
          updatedAt: item.updated_at || 'N/A',
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

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleUpdateOpen = () => {
    if (selectedItem) {
      setFormData({
        id: selectedItem.id,
        item_code: selectedItem.item_code,
        name: selectedItem.name,
        brand:selectedItem.brand,
        quantity:selectedItem.quantity,
        description:selectedItem.description,
        price:selectedItem.price,
        profit_margin:selectedItem.profit_margin,
        discount_type:selectedItem.discount_type,
        discount:selectedItem.discount,
        tax_percentage:selectedItem.tax_percentage,
        

      });
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleUpdateClose = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async () => {
    console.log('Updating customer:', formData);
    await AdminUpdateCustomersService.AdminUpdateCustomers(formData, formData.id);
    const customers = await AdminViewCustomersService.fetchCustomers();
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
    { field: 'item_code', headerName: 'Item Code', width: 160 },
    { field: 'name', headerName: 'Item name', width: 200 },
    { field: 'brand', headerName: 'Brand', width: 160 },
    { field: 'quantity', headerName: 'Quantity', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price(Rs.)', width: 200 },
    { field: 'profit_margin', headerName: 'Profit Margin (Rs.)', width: 200 },
    { field: 'discount_type', headerName: 'Discount Type', width: 200 },
    { field: 'discount', headerName: 'Discount Amount(Rs.)', width: 200 },
    { field: 'tax_percentage', headerName: 'Tax Percentage', width: 200 },
    { field: 'category_name', headerName: 'Item Category ', width: 200 },
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

