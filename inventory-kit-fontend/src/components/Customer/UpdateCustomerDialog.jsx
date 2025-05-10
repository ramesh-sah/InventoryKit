// UpdateCustomerDialog.jsx
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from '@mui/material';

const UpdateCustomerDialog = ({ open, handleClose, formData, handleFormChange, handleFormSubmit }) => (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
            {Object.keys(formData).map((key) => (
                <TextField
                    key={key}
                    autoFocus={key === 'firstName'}
                    margin="dense"
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    type={key === 'email' ? 'email' : 'text'}
                    fullWidth
                    name={key}
                    value={formData[key]}
                    onChange={handleFormChange}
                />
            ))}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleFormSubmit} color="primary">Update</Button>
        </DialogActions>
    </Dialog>
);

export default UpdateCustomerDialog;