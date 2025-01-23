
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import SalesStaffAddCustomersService from './../../../services/salesStaffServices/SalesStaffAddCustomersService';


// Styled container for the form
const FormContainer = styled(Box)(({ theme }) => ({
  margin: 'auto',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

const SalesStaffCustomersAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    shipping_address: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone_number || !formData.email || !formData.shipping_address) {
      setError('All fields are required.');
      return;
    }

    try {
      setError(null); // Clear errors
      await SalesStaffAddCustomersService.SalesStaffAddCustomers(formData); // Call the service
      setSuccess(true); // Display success notification

      // Reset form fields after submission
      setFormData({
        name: '',
        phone_number: '',
        email: '',
        shipping_address: '',
      });
    } catch (err) {
      setError(err.message); // Show the error message
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Add Customer
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              variant="outlined"
              helperText="Enter the customer's full name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
              variant="outlined"
              helperText="Enter a valid phone number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              variant="outlined"
              helperText="Enter a valid email address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Shipping Address"
              name="shipping_address"
              value={formData.shipping_address}
              onChange={handleInputChange}
              required
              variant="outlined"
              multiline
              rows={3}
              helperText="Enter the full shipping address"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                paddingY: 1.5,
                fontWeight: 'bold',
                letterSpacing: 1.2,
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        message="Customer added successfully!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </FormContainer>
  );
};

export default SalesStaffCustomersAdd;
