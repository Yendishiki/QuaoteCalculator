import React, { useState } from "react";
import { Grid, Typography, Button, Paper, Slider, TextField, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Quote } from "../model/Quote";
import { LoanApplication } from "../model/LoanApplication";




const LoanCalculator: React.FC = () => {
    const [formData, setFormData] = useState<LoanApplication>({
        title: "Mr.", // Initialize title with a default value
        amountRequired: 5000,
        term: 24,
        product: "ProductA",
    });

    const [quote, setQuote] = useState<Quote | null>(null);

    // Validate form data before submitting
    const validateForm = (): boolean => {
        if (!formData.firstname || !formData.lastname || !formData.mobile || !formData.email || !formData.dateOfBirth) {
            toast.error("All fields are required!");
            return false;
        }


        // Check if mobile number is valid (basic validation for length)
        if (!/^\d{10}$/.test(formData.mobile)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return false;
        }

        // Check if email is valid
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        // Amount required should be a positive value
        if (formData.amountRequired <= 0) {
            toast.error("Amount required should be greater than zero.");
            return false;
        }

        // Blacklist check for mobile numbers
        const blacklistedMobileNumbers = ["1234567890", "9876543210", "5555555555"]; // Add more blacklisted numbers as needed
        if (blacklistedMobileNumbers.includes(formData.mobile)) {
            toast.error("This mobile number is blacklisted.");
            return false;
        }

        // Blacklist check for email domains
        const blacklistedEmailDomains = ["example.com", "test.com", "blocked.com"]; // Add more blacklisted domains as needed
        const emailDomain = formData.email.split("@")[1];
        if (blacklistedEmailDomains.includes(emailDomain)) {
            toast.error("This email domain is blacklisted.");
            return false;
        }
        // Check if the applicant is at least 18 years old
        const today = new Date();
        const dob = new Date(formData.dateOfBirth);
        const age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();

        // Check if the applicant's birthday has passed this year
        if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
            toast.error("You must be at least 18 years old.");
            return false;
        }

        return true;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "term" || name === "amountRequired" ? Number(value) : value });
    };

    const calculateQuote = async () => {
        if (!validateForm()) {
            return; // Exit if validation fails
        }

        const response = await fetch("https://localhost:7219/api/loanapplication/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data: Quote = await response.json();
            setQuote(data);
        } else {
            toast.error("Failed to calculate the quote. Please try again later.");
        }
    };

    const handleBack = () => {
        setQuote(null);  // Reset quote to show the form again
    };

    // Product descriptions
    const productDescriptions = {
        ProductA: "ProductA: Interest-free loan for the selected duration.",
        ProductB: "ProductB: The first 2 months are interest-free. Minimum term is 6 months.",
        ProductC: "ProductC: No interest-free period. Standard loan with applicable interest.",
    };

    // Apply Now Button API Call
    const handleApply = async () => {
        try {
            const response = await fetch("https://localhost:7219/api/loanapplication/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.redirectUrl; // Redirecting to the URL returned from API
            } else {
                const errorData = await response.json();
                toast.error(errorData.ErrorMessage || "An error occurred. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to apply. Please check your internet connection and try again.");
        }
    };
    return (
        <Grid container spacing={3} justifyContent="center" sx={{ fontFamily: "Arial, sans-serif", padding: 2 }}>
            {!quote ? (
                <Grid item xs={12} sm={8} md={6}>
                    <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2 }}>
                        <Typography variant="h4" align="center" color="primary" gutterBottom>
                            Loan Calculator
                        </Typography>

                        {/* Amount Required */}
                        <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
                            How much do you need?
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1" color="textPrimary">
                                    <strong>Amount:</strong> ${formData.amountRequired}
                                </Typography>
                                <Slider
                                    value={formData.amountRequired}
                                    onChange={handleInputChange}
                                    name="amountRequired"
                                    min={100}
                                    max={15000}
                                    step={100}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `$${value}`}
                                    sx={{ marginTop: 1 }}
                                />
                            </Grid>
                        </Grid>

                        {/* Title Input in Two Columns */}



                        {/* User Information in Two Columns */}
                        <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
                            Your Information
                        </Typography>

                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
                            {/* Title Field */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    select
                                    label="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Dr.">Dr.</option>
                                </TextField>
                            </Grid>

                            {/* First Name Field */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="First Name"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Last Name Field */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Last Name"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Mobile Field */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    inputProps={{ maxLength: 10 }}
                                />
                            </Grid>

                            {/* Date of Birth Field */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/* Email Field */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    type="email"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ marginTop: 4 }}>
                            <Grid item xs={12}>
                                <Tooltip title={productDescriptions[formData.product]} arrow>
                                    <TextField
                                        select
                                        label="Product"
                                        name="product"
                                        value={formData.product}
                                        onChange={handleInputChange}
                                        fullWidth
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <option value="ProductA">ProductA</option>
                                        <option value="ProductB">ProductB</option>
                                        <option value="ProductC">ProductC</option>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Term (Months)"
                                    name="term"
                                    value={formData.term}
                                    onChange={handleInputChange}
                                    type="number"
                                    fullWidth
                                    sx={{ marginTop: 2 }}
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                        },
                                    }}
                                />
                            </Grid>

                        </Grid>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 3 }}
                            onClick={calculateQuote}
                        >
                            Calculate
                        </Button>
                    </Paper>
                </Grid>
            ) : (
                <Grid item xs={12} sm={8} md={6}>
                    <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2 }}>
                        <Typography variant="h4" align="center" color="primary" gutterBottom>
                            Your Quote
                        </Typography>

                        {/* User Information */}
                        <Typography variant="h6" color="textSecondary">
                            Your Information
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            <strong>Name:</strong> {quote.name}
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            <strong>Mobile:</strong> {quote.mobile}
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            <strong>Email:</strong> {quote.email}
                        </Typography>

                        {/* Finance Details */}
                        <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
                            Finance Details
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            <strong>Amount Required:</strong> ${quote.amountRequired}
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            <strong>Repayments from:</strong> ${quote.weeklyRepayment} weekly
                        </Typography>

                        {/* Apply Now Button */}
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ marginTop: 3 }}
                            onClick={handleApply}
                        >
                            Apply Now
                        </Button>

                        {/* Back Button */}
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            onClick={handleBack}
                        >
                            Back to Form
                        </Button>
                    </Paper>
                </Grid>
            )}

            {/* Toast Notifications Container */}
            <ToastContainer />
        </Grid>
    );
};

export default LoanCalculator;
