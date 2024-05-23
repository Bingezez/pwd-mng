import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";

import "../base.css";
import style from "./Registration.module.css";

const Registration = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFirstNameChange = (event) => {
        const inputFirstName = event.target.value.trim();
        setFirstName(inputFirstName);
        setIsFirstNameValid(inputFirstName.length > 0);
    };

    const handleLastNameChange = (event) => {
        const inputLastName = event.target.value.trim();
        setLastName(inputLastName);
        setIsLastNameValid(inputLastName.length > 0);
    };

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
        const isValidEmail =
            inputEmail.includes("@") && inputEmail.includes(".");
        setIsEmailValid(isValidEmail);
    };

    const handlePasswordChange = (event) => {
        const inputPassword = event.target.value;
        setPassword(inputPassword);
        setIsPasswordValid(validatePassword(inputPassword));
    };

    // Password validation function
    const validatePassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumbers &&
            hasSpecialChars
        );
    };

    const handleRegistrationClick = async () => {
        if (
            !isFirstNameValid ||
            !isLastNameValid ||
            !isEmailValid ||
            !isPasswordValid
        ) {
            setMessage("Please ensure all fields are valid.");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:5050/api/user", {
                firstName,
                lastName,
                email,
                password,
            });
            setMessage("Registration successful!");
            navigate("/login");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                    "An error occurred during registration."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="root">
            <Paper classes={{ root: style.root }}>
                <Typography classes={{ root: style.title }} variant="h5">
                    Registration
                </Typography>
                <TextField
                    className={style.field}
                    label="First Name"
                    fullWidth
                    error={!isFirstNameValid}
                    helperText={
                        isFirstNameValid ? "" : "Please enter your First Name"
                    }
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
                <TextField
                    className={style.field}
                    label="Last Name"
                    fullWidth
                    error={!isLastNameValid}
                    helperText={
                        isLastNameValid ? "" : "Please enter your Last Name"
                    }
                    value={lastName}
                    onChange={handleLastNameChange}
                />
                <TextField
                    className={style.field}
                    label="E-Mail"
                    fullWidth
                    error={!isEmailValid}
                    helperText={
                        isEmailValid ? "" : "Please enter a valid Email"
                    }
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    className={style.field}
                    label="Password"
                    fullWidth
                    error={!isPasswordValid}
                    helperText={
                        isPasswordValid
                            ? ""
                            : "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
                    }
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                />
                <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    onClick={handleRegistrationClick}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Registration"}
                </Button>
                {message && (
                    <Typography color="error" style={{ marginTop: 20 }}>
                        {message}
                    </Typography>
                )}
            </Paper>
        </div>
    );
};

export default Registration;
