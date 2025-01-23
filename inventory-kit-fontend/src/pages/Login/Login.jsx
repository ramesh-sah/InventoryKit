import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert,
    Paper,
    InputAdornment,
    IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LoginService from "../../services/LoginService/LoginService";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    background: "#ffffff"
}));

const StyledForm = styled("form")(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(2)
}));

const Logo = styled("img")({
    width: "120px",
    height: "auto",
    marginBottom: "1rem"
});

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error"
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setSnackbar({
                open: true,
                message: "Please fill in all fields",
                severity: "error"
            });
            return;
        }

        try {
            const response = await LoginService.Login(formData);
            setSnackbar({
                open: true,
                message: "Login successful!",
                severity: "success"
            });

            // Redirect based on the role received from the response
            if (response.role === "super-admin") {
                navigate("/super-admin-dashboard"); // Redirect to admin dashboard
            } else if (response.role === "admin") {
                navigate("/admin-dashboard"); // Redirect to user dashboard
            }else if (response.role ==="purchase-staff"){
                navigate("/purchase-dashboard");
            } else if (response.role ==="sales-staff"){
                navigate("/sales-dashboard")
            }
            else {
                navigate("/"); // Default fallback
            }
        } catch (error) {
            const errorMessage = error.message || "Login failed. Please try again.";
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error"
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    return (
        <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
            <StyledPaper>
                <Logo
                    src="https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?auto=format&fit=crop&w=200&h=200"
                    alt="Company Logo"
                />
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        mb: 4,
                        fontWeight: 600,
                        color: "#1a237e",
                        textAlign: "center"
                    }}
                >
                    Login to InventoryKit
                </Typography>

                <StyledForm onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        required
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaEnvelope />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        fullWidth
                        required
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaLock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Box sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                py: 1.5,
                                textTransform: "none",
                                fontSize: "1.1rem",
                                fontWeight: 500
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>

                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Button
                            color="primary"
                            sx={{ textTransform: "none" }}
                            onClick={() => {
                                setSnackbar({
                                    open: true,
                                    message: "Password reset link sent to your email!",
                                    severity: "info"
                                });
                            }}
                        >
                            Forgot password?
                        </Button>
                    </Box>
                </StyledForm>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: "100%" }}
                        variant="filled"
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </StyledPaper>
        </Container>
    );
};

export default Login;