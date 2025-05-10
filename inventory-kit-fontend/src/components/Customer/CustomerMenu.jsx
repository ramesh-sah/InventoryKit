// CustomerMenu.jsx
import React from 'react';
import { Menu, MenuItem } from '@mui/material';

const CustomerMenu = ({ anchorEl, handleMenuClose, handleUpdateOpen, handleDelete }) => (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleUpdateOpen}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
);

export default CustomerMenu;