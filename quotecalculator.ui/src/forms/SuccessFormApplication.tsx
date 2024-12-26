import React from "react";
import { Grid, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
    const navigate = useNavigate(); // Hook to navigate
    const handleGoHome = () => {
        navigate("/"); // Redirect to home page
    };

    return (
        <Grid container spacing={3} justifyContent="center" sx={{ fontFamily: "Arial, sans-serif", padding: 2 }}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2 }}>
                    <Typography variant="h4" align="center" color="primary" gutterBottom>
                        Application Successful!
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }} align="center">
                        Thank you for applying. Your application has been successfully submitted.
                    </Typography>
                    <Typography variant="body1" color="textPrimary" sx={{ marginTop: 2 }} align="center">
                        We will review your application and get back to you soon.
                    </Typography>
                    <Grid container spacing={2} sx={{ marginTop: 4 }}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleGoHome} // Navigate to home page on button click
                            >
                                Go to Home Page
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SuccessPage;
