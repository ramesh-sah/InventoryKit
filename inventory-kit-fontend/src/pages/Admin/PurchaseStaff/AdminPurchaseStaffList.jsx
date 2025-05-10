

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
import AdminPurchaseStaffListService from './../../../services/AdminServices/AdminPurchaseStaffListService';
import AdminUpdatePurchaseStaffService from './../../../services/AdminServices/AdminUpdatePurchaseStaffService';
import AdminDeletePurchaseStaffService from '../../../services/AdminServices/AdminDeletePurchaseStaffService';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminPurchaseStaffList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedPurchaseStaff, setSelectedPurchaseStaff] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '', // Assign unique IDs for DataGrid
    name: '',
    email: '',
    mobile_phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    date_of_birth: '',

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchaseStaff = await AdminPurchaseStaffListService.fetchPurchaseStaff();
        const formattedData = purchaseStaff.map((purchaseStaff) => ({
          id: purchaseStaff.id || 'N/A', // Assign unique IDs for DataGrid
          name: purchaseStaff.name || 'N/A',
          email: purchaseStaff.email || 'N/A',
          mobile_phone: purchaseStaff.mobile_phone || 'N/A',
          address1: purchaseStaff.address_line_1 || 'N/A',
          address2: purchaseStaff.address_line_2 || 'N/A',
          city: purchaseStaff.city || 'N/A',
          state: purchaseStaff.state || 'N/A',
          zip_code: purchaseStaff.zip_code || 'N/A',
          country: purchaseStaff.country || 'N/A',
          date_of_birth: purchaseStaff.date_of_birth || "N/A",
          is_active: purchaseStaff.is_active || "N/A",
          created_at: purchaseStaff.created_at || 'N/A',
          updated_at: purchaseStaff.updated_at || 'N/A'

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


  const handleMenuClick = (event, purchaseStaff) => {
    setAnchorEl(event.currentTarget);
    setSelectedPurchaseStaff(purchaseStaff);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPurchaseStaff(null);
  };

  const handleUpdateOpen = () => {
    if (selectedPurchaseStaff) {
      setFormData({
        id: selectedPurchaseStaff.id,
        name: selectedPurchaseStaff.name,
        email: selectedPurchaseStaff.email,
        mobile_phone: selectedPurchaseStaff.mobile_phone,
        address1: selectedPurchaseStaff.address1,
        address2: selectedPurchaseStaff.address2,
        city: selectedPurchaseStaff.city,
        state: selectedPurchaseStaff.state,
        zip_code: selectedPurchaseStaff.zip_code,
        country: selectedPurchaseStaff.country,
        date_of_birth: selectedPurchaseStaff.date_of_birth,

      });
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleUpdateClose = () => {
    setOpenDialog(false);
    setSelectedPurchaseStaff(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async () => {
    console.log('Updating customer:', formData);
    await AdminUpdatePurchaseStaffService.AdminUpdatePurchaseStaff(formData, formData.id);


    setSnackbarMessage(`Updated customer: ${formData.name}`);
    setOpenSnackbar(true);
    handleUpdateClose();
  };

  const handleDelete = async () => {
    if (selectedPurchaseStaff) {
      console.log('Deleting customer with ID:', selectedPurchaseStaff.id);


      await AdminDeletePurchaseStaffService.AdminDeletePurchaseStaff(selectedPurchaseStaff.id); // Call the service


      setSnackbarMessage(`Deleted customer with ID: ${selectedPurchaseStaff.id}`);
      setOpenSnackbar(true);
      setRows((prevRows) => prevRows.filter((row) => row.id !== selectedPurchaseStaff.id));
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

    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobile_phone', headerName: 'Phone Number', width: 160 },
    { field: 'address1', headerName: 'Address Line 1', width: 200 },
    { field: 'address2', headerName: 'Address Line 2', width: 200 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'zip_code', headerName: 'Zip Code', width: 100 },
    { field: 'country', headerName: 'Country', width: 130 },
    { field: 'date_of_birth', headerName: 'Date of Birth', width: 150 },
    { field: 'is_active', headerName: 'Is Active', width: 100 },
    { field: 'created_at', headerName: 'Created At', width: 180 },
    { field: 'updated_at', headerName: 'Updated At', width: 180 },

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
              name="mobile_phone"
              value={formData.mobile_phone}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Address Line 1"
              type="text"
              fullWidth
              name="address1"
              value={formData.address1}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Address Line 2"
              type="text"
              fullWidth
              name="address2"
              value={formData.address2}
              onChange={handleFormChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="City"
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
              label="Zip Code"
              type="text"
              fullWidth
              name="zip_code"
              value={formData.zip_code}
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
              fullWidth
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
              required
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

