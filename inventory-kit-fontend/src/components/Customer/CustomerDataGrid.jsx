// CustomerDataGrid.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';


const CustomerDataGrid = ({ rows, loading, handleMenuClick, paginationModel }) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Created By (Name)', width: 160 },
        { field: 'lastName', headerName: 'Customer Name', width: 160 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 160 },
        { field: 'shippingAddress', headerName: 'Shipping Address', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleMenuClick(e, params.row)}
                >
                    Actions
                </Button>
            ),
        },
    ];

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
        />
    );
};

export default CustomerDataGrid;