import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminPurchaseStaffAddService from '../../../services/AdminServices/AdminPurchaseStaffAddService';

// Styled components
const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ProfilePicture = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(14),
  height: theme.spacing(14),
  margin: theme.spacing(2),
}));

const AdminPurchaseStaffAdd = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'purchase-staff',
    mobile_phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    date_of_birth: '',
    password: '',
    password2: '',
    profile_picture: null,
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password !== formData.password2) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);

    // Prepare data for API call
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    try {
      // Call the API to add the purchase staff
      await AdminPurchaseStaffAddService.AdminPurchaseStaffAdd(formDataToSubmit);

      alert('Purchase staff added successfully!');
      navigate('/admin-purchase-staff/purchase-staff-list');

      // Reset the form
      setFormData({
        email: '',
        name: '',
        role: 'purchase-staff',
        mobile_phone: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        date_of_birth: '',
        password: '',
        password2: '',
        profile_picture: null,
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add purchase staff. Please try again.');
    }
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        Add Purchase Staff
      </Typography>
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ProfilePicture
              src={
                formData.profile_picture
                  ? URL.createObjectURL(formData.profile_picture)
                  : ''
              }
            />
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="purchase-staff">Purchase Staff</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile Phone"
              name="mobile_phone"
              value={formData.mobile_phone}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="password2"
              type={showPassword2 ? 'text' : 'password'}
              value={formData.password2}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword2(!showPassword2)}
                      edge="end"
                    >
                      {showPassword2 ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default AdminPurchaseStaffAdd;
