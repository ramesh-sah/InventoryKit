import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    useTheme,
    LinearProgress,
    Divider,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";
import {
    AccountBalanceWallet,
    AttachMoney,
    Payment,
    History,
    CreditCard,
    CheckCircle,
    Error
} from "@mui/icons-material";

const DashboardContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh"
}));

const StatCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: "100%",
    transition: "transform 0.3s",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[6]
    }
}));

const BillingDashboard = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(5);

    const revenueData = [
        { month: "Jan", revenue: 65, profit: 45 },
        { month: "Feb", revenue: 78, profit: 52 },
        { month: "Mar", revenue: 82, profit: 58 },
        { month: "Apr", revenue: 75, profit: 50 },
        { month: "May", revenue: 90, profit: 65 },
        { month: "Jun", revenue: 88, profit: 60 }
    ];

    const paymentMethodsData = [
        { name: "Credit Card", value: 45 },
        { name: "PayPal", value: 30 },
        { name: "Bank Transfer", value: 25 }
    ];

    const transactions = [
        { id: 1, amount: 149.99, date: "2023-07-15", method: "Visa", status: "Completed" },
        { id: 2, amount: 299.99, date: "2023-07-14", method: "Mastercard", status: "Pending" },
        { id: 3, amount: 99.99, date: "2023-07-13", method: "PayPal", status: "Completed" },
        { id: 4, amount: 199.99, date: "2023-07-12", method: "Amex", status: "Failed" }
    ];

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "amount", headerName: "Amount", width: 130, type: "number" },
        { field: "date", headerName: "Date", width: 150 },
        { field: "method", headerName: "Method", width: 130 },
        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={
                        params.value === "Completed" ? "success" :
                            params.value === "Pending" ? "warning" : "error"
                    }
                    size="small"
                />
            )
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulated API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                setLoading(false);
            } catch (err) {
                setError("Failed to load billing data");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ width: '100%', p: 5 }}>
                <LinearProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ width: '100%', p: 5 }}>
                <Chip label={error} color="error" icon={<Error />} />
            </Box>
        );
    }

    return (
        <DashboardContainer maxWidth="xl">
            <Grid container spacing={4}>
                {/* Header Stats */}
                <Grid item xs={12} md={3}>
                    <StatCard>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <AccountBalanceWallet fontSize="large" />
                                <div>
                                    <Typography variant="subtitle1">Total Balance</Typography>
                                    <Typography variant="h4">$45,890</Typography>
                                </div>
                            </Box>
                        </CardContent>
                    </StatCard>
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <AttachMoney fontSize="large" />
                                <div>
                                    <Typography variant="subtitle1">Monthly Revenue</Typography>
                                    <Typography variant="h4">$12,340</Typography>
                                </div>
                            </Box>
                        </CardContent>
                    </StatCard>
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Payment fontSize="large" />
                                <div>
                                    <Typography variant="subtitle1">Pending Payments</Typography>
                                    <Typography variant="h4">$2,560</Typography>
                                </div>
                            </Box>
                        </CardContent>
                    </StatCard>
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <History fontSize="large" />
                                <div>
                                    <Typography variant="subtitle1">Transactions</Typography>
                                    <Typography variant="h4">1,234</Typography>
                                </div>
                            </Box>
                        </CardContent>
                    </StatCard>
                </Grid>

                {/* Transactions Data Grid */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <CreditCard fontSize="small" />
                                <Typography variant="h6">Recent Transactions</Typography>
                            </Box>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={transactions}
                                    columns={columns}
                                    pageSize={pageSize}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    pagination
                                    disableSelectionOnClick
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Payments List */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Payments
                            </Typography>
                            <List>
                                {transactions.map((transaction) => (
                                    <React.Fragment key={transaction.id}>
                                        <ListItem>
                                            <ListItemIcon>
                                                {transaction.status === "Completed" ? (
                                                    <CheckCircle color="success" />
                                                ) : (
                                                    <Error color="error" />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`$${transaction.amount}`}
                                                secondary={`${transaction.date} • ${transaction.method}`}
                                            />
                                            <Chip
                                                label={transaction.status}
                                                color={
                                                    transaction.status === "Completed" ? "success" :
                                                        transaction.status === "Pending" ? "warning" : "error"
                                                }
                                                size="small"
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    
                      
                  
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

export default BillingDashboard;