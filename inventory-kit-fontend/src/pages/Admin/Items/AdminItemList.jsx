import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  InputAdornment,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// Helper function to sort data by column
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Function to handle the sorting logic
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Function to sort the data based on the sorting function
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const AdminItemList = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState('');

  // Sample Data - API response
  const sampleData = [
    {
      id: 1,
      item_code: 'Quae est consequatur',
      name: 'Serena Beard',
      brand: 'Ex nesciunt minima',
      quantity: 230,
      description: 'Ullam corrupti qsdfasduam',
      image: null,
      price: '359.00',
      profit_margin: '23.00',
      discount_type: 'percentage',
      discount: '12.00',
      tax_percentage: '20.00',
      category: 1,
    },
    // Add more items here as needed for testing
  ];

  useEffect(() => {
    // Simulate fetching data from API
    setItems(sampleData);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedItems = stableSort(filteredItems, getComparator(order, orderBy));

  return (
    <Box sx={{ width: '100%' }}>
      {/* Search filter */}
      <TextField
        fullWidth
        label="Search by Item Name"
        variant="outlined"
        value={filterText}
        onChange={handleFilterChange}
        sx={{ marginBottom: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">🔍</InputAdornment>
          ),
        }}
      />

      {/* Table */}
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {['item_code', 'name', 'brand', 'quantity', 'price'].map(
                (headCell) => (
                  <TableCell
                    key={headCell}
                    sortDirection={orderBy === headCell ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell}
                      direction={orderBy === headCell ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, headCell)}
                    >
                      {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                      {orderBy === headCell ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell>{item.item_code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AdminItemList;
