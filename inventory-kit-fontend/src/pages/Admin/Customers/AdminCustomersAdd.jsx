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
import AdminAddCustomersService from './../../../services/AdminServices/AdminAddCustomersService';

// Styled container for the form
const FormContainer = styled(Box)(({ theme }) => ({
  margin: 'auto',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

const AdminCustomersAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    shipping_address: '',
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  // Validate Nepalese phone numbers
  const validatePhoneNumber = (phone) => {
    const nepaliPhoneRegex = /^\+977(98|97)\d{8}$/;
    return nepaliPhoneRegex.test(phone);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required.';
    if (!validatePhoneNumber(formData.phone_number))
      newErrors.phone_number = 'Enter a valid Nepalese phone number (e.g., +9779812345678).';
    if (!formData.shipping_address) newErrors.shipping_address = 'Shipping address is required.';

    setError(newErrors);

    // Stop submission if there are errors
    if (Object.keys(newErrors).length > 0) return;

    try {
      await AdminAddCustomersService.AdminAddCustomers(formData);
      setSuccess(true);

      // Reset form
      setFormData({
        name: '',
        phone_number: '',
        email: '',
        shipping_address: '',
      });
    } catch (err) {
      setError({ submit: err.message });
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Add Customer
      </Typography>
      {error.submit && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error.submit}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item lg={4} xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              variant="outlined"
              error={!!error.name}
              helperText={error.name}
            />
          </Grid>
          <Grid item lg={4} xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              placeholder="+9779812345678"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
              variant="outlined"
              error={!!error.phone_number}
              helperText={error.phone_number}
            />
          </Grid>
          <Grid item lg={4} xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              variant="outlined"
              error={!!error.email}
              helperText={error.email}
            />
          </Grid>
          <Grid item lg={12} xs={12} sm={12} md={12}>
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
              error={!!error.shipping_address}
              helperText={error.shipping_address}
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

export default AdminCustomersAdd;
