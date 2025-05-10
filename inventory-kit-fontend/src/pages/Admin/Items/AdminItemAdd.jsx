import React, { useState, useEffect } from 'react';
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
  Container,
} from '@mui/material';
import AdminItemAddService from './../../../services/AdminServices/AdminItemAddService';
import AdminItemCategoryAddService from './../../../services/AdminServices/AdminItemCategoryAddService';
import AdminItemCategoryListService from './../../../services/AdminServices/AdminItemCategoryListService'; // Import the category list service

const AdminItemAdd = () => {
  const [categories, setCategories] = useState([]); // State for categories
  const [itemFormData, setItemFormData] = useState({
    item_code: '',
    name: '',
    brand: '',
    quantity: '',
    description: '',
   
    price: '',
    profit_margin: '',
    discount_type: '',
    discount: '',
    tax_percentage: '',
    category: '',
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
  });

  const [itemFormError, setItemFormError] = useState(null);
  const [categoryFormError, setCategoryFormError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await AdminItemCategoryListService.fetchItemCategory();
        setCategories(fetchedCategories); // Assuming fetchedCategories is an array
      } catch (error) {
        console.error('Failed to fetch categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setItemFormData({ ...itemFormData, [name]: value });
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const handleFileChange = (e) => {
    setItemFormData({ ...itemFormData, image: e.target.files[0] });
  };

  const resetItemForm = () => {
    setItemFormData({
      item_code: '',
      name: '',
      brand: '',
      quantity: '',
      description: '',
      price: '',
      profit_margin: '',
      discount_type: '',
      discount: '',
      tax_percentage: '',
      category: '',
    });
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: '',
      description: '',
    });
  };

  const validateItemForm = () => {
    const errors = [];
    const { item_code, name, brand, quantity, price, profit_margin, discount, tax_percentage, category } = itemFormData;

    if (!item_code || item_code.length < 1 || item_code.length > 50) {
      errors.push('Item code is required and must be between 1 and 50 characters.');
    }
    if (!name || name.length < 1 || name.length > 255) {
      errors.push('Name is required and must be between 1 and 255 characters.');
    }
    if (brand && brand.length > 100) {
      errors.push('Brand must be 100 characters or less.');
    }
    if (!Number.isInteger(Number(quantity)) || quantity < 0 || quantity > Number.MAX_SAFE_INTEGER) {
      errors.push('Quantity is required and must be a non-negative integer.');
    }
    if (!price || !/^\d+(\.\d{1,2})?$/.test(price)) {
      errors.push('Price is required and must be a valid decimal.');
    }
    if (!profit_margin || !/^\d+(\.\d{1,2})?$/.test(profit_margin)) {
      errors.push('Profit margin is required and must be a valid decimal.');
    }
    if (discount && !/^\d+(\.\d{1,2})?$/.test(discount)) {
      errors.push('Discount must be a valid decimal if provided.');
    }
    if (tax_percentage && !/^\d+(\.\d{1,2})?$/.test(tax_percentage)) {
      errors.push('Tax percentage must be a valid decimal if provided.');
    }
    if (category && !Number.isInteger(Number(category))) {
      errors.push('Category must be a valid integer if provided.');
    }

    return errors;
  };

  const handleItemFormSubmit = async (e) => {
    e.preventDefault();

    const errors = validateItemForm();
    if (errors.length > 0) {
      setItemFormError(errors.join(' '));
      return;
    }

    setItemFormError(null);
    const formData = new FormData();
    Object.entries(itemFormData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await AdminItemAddService.AdminItemAdd(formData);
      console.log('Response:', response);
      setSuccess(true);
      resetItemForm();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setItemFormError('Failed to add item. Please try again.');
    }
  };

  const handleCategoryFormSubmit = async (e) => {
    e.preventDefault();

    if (!categoryFormData.name || !categoryFormData.description) {
      setCategoryFormError('All fields in the category form are required.');
      return;
    }

    setCategoryFormError(null);
    try {
      const response = await AdminItemCategoryAddService.AdminItemCategoryAdd(categoryFormData);
      console.log('Response:', response);
      setSuccess(true);
      resetCategoryForm();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setCategoryFormError('Failed to add category. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box sx={{ backgroundColor: '#f9f9f9', padding: 3, borderRadius: 2, boxShadow: 3, mb: 5 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>Add New Category</Typography>
        {categoryFormError && <Alert severity="error" sx={{ mb: 2 }}>{categoryFormError}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Category added successfully!</Alert>}
        <form onSubmit={handleCategoryFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Category Name" name="name" value={categoryFormData.name} onChange={handleCategoryInputChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Category Description" name="description" value={categoryFormData.description} onChange={handleCategoryInputChange} multiline rows={4} required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box sx={{ backgroundColor: '#f9f9f9', padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>Add New Item</Typography>
        {itemFormError && <Alert severity="error" sx={{ mb: 2 }}>{itemFormError}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Item added successfully!</Alert>}
        <form onSubmit={handleItemFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Item Code" name="item_code" value={itemFormData.item_code} onChange={handleItemInputChange} required /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Name" name="name" value={itemFormData.name} onChange={handleItemInputChange} required /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Brand" name="brand" value={itemFormData.brand} onChange={handleItemInputChange} maxLength={100} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Quantity" name="quantity" type="number" value={itemFormData.quantity} onChange={handleItemInputChange} required /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Price" name="price" type="number" value={itemFormData.price} onChange={handleItemInputChange} required /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Profit Margin (%)" name="profit_margin" type="number" value={itemFormData.profit_margin} onChange={handleItemInputChange} required /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Discount Type</InputLabel>
                <Select name="discount_type" value={itemFormData.discount_type} onChange={handleItemInputChange}>
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Discount" name="discount" type="number" value={itemFormData.discount} onChange={handleItemInputChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Tax Percentage" name="tax_percentage" type="number" value={itemFormData.tax_percentage} onChange={handleItemInputChange} /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={itemFormData.category} onChange={handleItemInputChange}>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth sx={{ paddingY: 1.5 }}>Upload Image<input type="file" hidden accept="image/*" onChange={handleFileChange} /></Button>
              {itemFormData.image && <Typography variant="body2" color="textSecondary">Selected File: {itemFormData.image.name}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ paddingY: 1.5 }}>Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AdminItemAdd;