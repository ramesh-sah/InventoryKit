import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';

const AdminItemAdd = () => {
  const [formData, setFormData] = useState({
    item_code: '',
    name: '',
    brand: '',
    quantity: '',
    description: '',
    image: null,
    price: '',
    profit_margin: '',
    discount_type: '',
    discount: '',
    tax_percentage: '',
    category: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.item_code ||
      !formData.name ||
      !formData.brand ||
      !formData.quantity ||
      !formData.price ||
      !formData.profit_margin ||
      !formData.discount_type ||
      !formData.discount ||
      !formData.tax_percentage ||
      !formData.category
    ) {
      setError('All fields are required.');
      return;
    }

    setError(null);
    setSuccess(true);

    // API request mock
    console.log('Submitted Data:', formData);

    // Clear form after submission
    setFormData({
      item_code: '',
      name: '',
      brand: '',
      quantity: '',
      description: '',
      image: null,
      price: '',
      profit_margin: '',
      discount_type: '',
      discount: '',
      tax_percentage: '',
      category: '',
    });
  };

  return (
    <Box
      maxWidth={800}
      margin="auto"
      padding={3}
      sx={{ backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}
    >
      <Typography variant="h4" textAlign="center" marginBottom={2}>
        Add New Item
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          Item added successfully!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* First Column */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Item Code"
              name="item_code"
              value={formData.item_code}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Profit Margin (%)"
              name="profit_margin"
              type="number"
              value={formData.profit_margin}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Discount Type</InputLabel>
              <Select
                name="discount_type"
                value={formData.discount_type}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Third Column */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tax Percentage"
              name="tax_percentage"
              type="number"
              value={formData.tax_percentage}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <MenuItem value={1}>Electronics</MenuItem>
                <MenuItem value={2}>Clothing</MenuItem>
                <MenuItem value={3}>Groceries</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Image Upload Field */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ paddingY: 1.5 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {formData.image && (
              <Typography variant="body2" color="textSecondary">
                Selected File: {formData.image.name}
              </Typography>
            )}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ paddingY: 1.5 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AdminItemAdd;
