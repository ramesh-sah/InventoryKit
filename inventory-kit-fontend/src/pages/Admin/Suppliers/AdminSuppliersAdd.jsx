

// Import necessary dependencies
import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';

// Styled container for the form
const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  maxWidth: '900px',
  margin: 'auto',
}));

// Styled button for hover effect
const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
    transition: 'transform 0.2s, background-color 0.2s',
  },
}));

// Component for Add Supplier Form
const AdminSuppliersAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    country: '',
    state: '',
    city: '',
    postal_code: '',
    address: '',
    tax_no: '',
    gst_no: '',
    status: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.country || !formData.state || !formData.city) {
      setError('Please fill all required fields.');
      return;
    }
    setError(null);
    console.log('Supplier data submitted:', formData);
    setFormData({
      name: '',
      phone_number: '',
      email: '',
      country: '',
      state: '',
      city: '',
      postal_code: '',
      address: '',
      tax_no: '',
      gst_no: '',
      status: '',
    });
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        Add Supplier
      </Typography>
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Country *"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="State *"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="City *"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Tax No"
              name="tax_no"
              value={formData.tax_no}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="GST No"
              name="gst_no"
              value={formData.gst_no}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              select
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <StyledButton type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default AdminSuppliersAdd;
