import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Alert,
} from '@mui/material';
import AdminExpenseCategoryAddService from '../../../services/AdminServices/AdminExpenseCategoryAddService';


const AdminExpenseCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.description) {
      setError('All fields are required.');
      setSuccess(false);
      return;
    }

    try {
      // Submit data to the service
      const response = await AdminExpenseCategoryAddService.AdminExpenseCategoryAdd(formData);
      console.log('Response:', response);

      setError(null);
      setSuccess(true);

      // Clear the form
      setFormData({
        name: '',
        description: '',
      });
    } catch (err) {
      // Handle errors from the service
      console.error(err.message);
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Add New Expense Category
        </Typography>

        {/* Error and Success Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Expense category added successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AdminExpenseCategory;
