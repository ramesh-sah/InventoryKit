





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
import AdminSuppliersListService from './../../../services/AdminServices/AdminSuppliersListService';
import AdminDeleteSupplierService from './../../../services/AdminServices/AdminSupplierDeleteService';
import AdminSupplierUpdateService from '../../../services/AdminServices/AdminSupplierUpdateService';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminCustomersList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '', // Assign unique IDs for DataGrid
    name: '',
    email: '',
    phone_number: '',
    country: '',               // New field
    state: '',                   // New field
    city: '',                     // New field
    postal_code: '',       // New field
    address: '',               // New field
    tax_no: '',                  // New field
    gst_no: '',                  // New field
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suppliers = await AdminSuppliersListService.fetchSuppliers();
        const formattedData = suppliers.map((supplier) => ({
          id: supplier.id, // Assign unique IDs for DataGrid
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
  const handleMenuClick = (event, supplier) => {
    setAnchorEl(event.currentTarget);
    setSelectedSupplier(supplier);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSupplier(null);
  };

  const handleUpdateOpen = () => {
    if (selectedSupplier) {
      setFormData({
        id: selectedSupplier.id,
        name: selectedSupplier.supplierName,
        email: selectedSupplier.email,
        phone_number: selectedSupplier.phoneNumber,
        country: selectedSupplier.country,
        state:selectedSupplier.state,
        city:selectedSupplier.city,
        postal_code:selectedSupplier.postalCode,
        address:selectedSupplier.address,
        tax_no:selectedSupplier.taxNo,
        gst_no:selectedSupplier.gstNo,


      });
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleUpdateClose = () => {
    setOpenDialog(false);
    setSelectedSupplier(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async () => {
    console.log('Updating customer:', formData);
    await AdminSupplierUpdateService.AdminSupplierUpdate(formData, formData.id);


    setSnackbarMessage(`Updated customer: ${formData.name}`);
    setOpenSnackbar(true);
    handleUpdateClose();
  };





  const handleDelete = async () => {
    if (selectedSupplier) {
      console.log('Deleting customer with ID:', selectedSupplier.id);


      await AdminDeleteSupplierService.AdminDeleteSupplier(selectedSupplier.id); // Call the service


      setSnackbarMessage(`Deleted customer with ID: ${selectedSupplier.id}`);
      setOpenSnackbar(true);
      setRows((prevRows) => prevRows.filter((row) => row.id !== selectedSupplier.id));
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
    { field: 'status', headerName: 'Status', width: 120 }, 
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
              label="Country"
              type="text"
              fullWidth
              name="country"
              value={formData.country}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="State"
              type="text"
              fullWidth
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="city"
              type="text"
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="postal_code"
              type="text"
              fullWidth
              name="country"
              value={formData.postal_code}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Address"
              type="text"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Tax No"
              type="text"
              fullWidth
              name="tax_no"
              value={formData.tax_no}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Gst No"
              type="text"
              fullWidth
              name="gst_no"
              value={formData.gst_no}
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

