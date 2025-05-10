import { TextField, InputAdornment, Avatar, IconButton, Menu, MenuItem, Badge, Typography, Box } from "@mui/material";
import { Search as SearchIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {/* Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Search"
        size="small"
        sx={{ width: 250, backgroundColor: "#f5f5f5", borderRadius: "5px" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Beta Version Badge */}
      <Badge color="secondary" >
        <Typography variant="body2" color="textSecondary">
          Version 1.0
        </Typography>
      </Badge>

      {/* User Avatar & Menu */}
      <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
        <Avatar src="https://mui.com/static/logo.png" alt="User" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem component={Link} to="" onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );p
}
