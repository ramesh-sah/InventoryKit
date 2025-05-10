import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AdminExpenseCategoryListService from '../../../services/AdminServices/AdminExpenseCategoryListService';

export default function AdminExpenseCategoryList() {
  // States
  const [rows, setRows] = useState([]); // DataGrid rows
  const [loading, setLoading] = useState(true); // Loading state
  const [rowCount, setRowCount] = useState(0); // Total number of rows (from backend)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,      // 0-based page index (DataGrid uses 0-based pagination)
    pageSize: 5,  // Default page size
  });

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Category Name', width: 160 },
    { field: 'description', headerName: 'Category Description', width: 200 },
    { field: 'created_by_email', headerName: 'Created Email', width: 200 },
    { field: 'created_by_name', headerName: 'Created Name', width: 200 },
  ];

  // Function to fetch data from the service
  const fetchData = async () => {
    setLoading(true); // Set loading state
    try {
      const { page, pageSize } = paginationModel; // Get page and pageSize from state
      const response = await AdminExpenseCategoryListService.fetchExpenseCategory(page + 1, pageSize); // Convert 0-based to 1-based pagination
      const { results, count } = response; // Destructure results and count from response

      // Format data for DataGrid rows
      const formattedData = results.map((category) => ({
        id: category.id, // Use unique ID from backend
        name: category.name || 'N/A',
        description: category.description || 'N/A',
        created_by_email: category.created_by?.email || 'N/A',
        created_by_name: category.created_by?.name || 'N/A',
      }));

      // Update state with fetched data
      setRows(formattedData);
      setRowCount(count); // Update total row count
    } catch (error) {
      console.error('Failed to fetch expense categories:', error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data whenever pagination model changes
  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  return (
    <Paper sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        paginationMode="server" // Enable server-side pagination
        rowCount={rowCount} // Total rows from backend
        paginationModel={paginationModel} // Controlled pagination state
        onPaginationModelChange={setPaginationModel} // Update state on page/size change
        pageSizeOptions={[5, 10, 20]} // Allow changing page size
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
