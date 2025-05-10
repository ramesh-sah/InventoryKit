// ExportButtons.jsx
import React from 'react';
import { Button } from '@mui/material';

const ExportButtons = ({ exportToCSV, exportToExcel, exportToJSON }) => (
    <div style={{ padding: '16px' }}>
        <Button variant="contained" color="success" onClick={exportToCSV} sx={{ margin: '0 8px' }}>
            Export CSV
        </Button>
        <Button variant="contained" color="success" onClick={exportToExcel} sx={{ margin: '0 8px' }}>
            Export Excel
        </Button>
        <Button variant="contained" color="success" onClick={exportToJSON} sx={{ margin: '0 8px' }}>
            Export JSON
        </Button>
    </div>
);

export default ExportButtons;