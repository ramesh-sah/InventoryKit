import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";

// Functional component for the 404 Not Found page using Material UI
function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Top Image */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
        alt="Not Found"
        sx={{
          height: "280px",
          width: "100%",
          objectFit: "cover",
          filter: "brightness(0.75)",
          marginBottom: 4,
        }}
      />

      {/* Content Section */}
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          The page you are looking for does not exist or has been moved. Let us help you get back on track.
        </Typography>

        {/* Back Home Button */}
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{
            marginTop: 4,
            paddingX: 4,
            paddingY: 2,
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          Go Back Home
        </Button>
      </Container>

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#f0f0f0",
          textAlign: "center",
          paddingY: 2,
        }}
      >
        <Typography variant="caption" color="textSecondary">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default NotFoundPage;
