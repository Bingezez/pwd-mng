import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import "../base.css";
import style from "./Login.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [code, setTwoFactorKey] = useState("");
    const [token, setToken] = useState(""); // Новий стан для збереження токена
    const [show2FAInput, setShow2FAInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [twoFAErrorMessage, setTwoFAErrorMessage] = useState("");
    const [copySuccess, setCopySuccess] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);

        const isValidEmail = inputEmail.includes("@");
        setIsEmailValid(isValidEmail);
    };

    const handlePasswordChange = (event) => {
        const inputPassword = event.target.value;
        setPassword(inputPassword);
    };

    const handleLoginClick = () => {
        setErrorMessage("");
        axios
            .post("http://localhost:5050/api/auth", { email, password })
            .then((response) => {
                if (response.status === 200) {
                    // Отримуємо токен і зберігаємо його в стані
                    const receivedToken = response.data.token;
                    setToken(receivedToken);
                    setShow2FAInput(true);
                } else {
                    setErrorMessage(
                        "Login failed. Please check your credentials."
                    );
                }
            })
            .catch((error) => {
                setErrorMessage("Login failed. Please check your credentials.");
                console.error("There was an error logging in!", error);
            });
    };

    const handle2FAClose = () => {
        setShow2FAInput(false);
        setTwoFactorKey("");
        setToken(""); // Очищаємо токен при закритті діалогу
        setTwoFAErrorMessage("");
        setCopySuccess("");
    };

    const handle2FASubmit = () => {
        setTwoFAErrorMessage("");
        axios
            .post("http://localhost:5050/api/auth/login", {
                email,
                password,
                code,
            })
            .then(async (response) => {
                if (response.status === 200) {
                    const accessToken = response.data.accessToken;
                    Cookies.set("accessToken", accessToken);

                    try {
                        await axios.post(
                            "http://localhost:5050/api/chipher/",
                            {},
                            {
                                headers: {
                                    Authorization: `${accessToken}`,
                                },
                            }
                        );
                        navigate("/manager");
                    } catch (error) {
                        console.error("Error generating key!", error);
                        setTwoFAErrorMessage("Failed to generate key.");
                    }
                } else {
                    setTwoFAErrorMessage(
                        "Invalid two-factor authentication code."
                    );
                    console.error("There was an error logging in!");
                }
            })
            .catch((error) => {
                setTwoFAErrorMessage("Invalid two-factor authentication code.");
                console.error(
                    "There was an error verifying the two-factor key!",
                    error
                );
            });
    };

    const handleCopyToken = () => {
        navigator.clipboard
            .writeText(token)
            .then(() => {
                setCopySuccess("Token copied to clipboard!");
            })
            .catch((error) => {
                console.error("Failed to copy token: ", error);
            });
    };

    return (
        <div className="root">
            <Paper classes={{ root: style.root }}>
                <Typography classes={{ root: style.title }} variant="h5">
                    Login
                </Typography>
                <TextField
                    className={style.field}
                    label="E-Mail"
                    error={!isEmailValid}
                    helperText={isEmailValid ? "" : "Email is not valid"}
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    className={style.field}
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div className={style.errorMessage}>
                    {errorMessage && (
                        <Typography color="error">{errorMessage}</Typography>
                    )}
                </div>
                <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    onClick={handleLoginClick}
                >
                    Login
                </Button>

                <Dialog open={show2FAInput} onClose={handle2FAClose}>
                    <DialogTitle>Enter Two-Factor Key</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Please enter the two-factor authentication code sent
                            to your email.
                        </Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleCopyToken}
                        >
                            Copy Token
                        </Button>
                        {copySuccess && (
                            <Typography color="success">
                                {copySuccess}
                            </Typography>
                        )}
                        <TextField
                            label="Two-Factor Key"
                            fullWidth
                            value={code}
                            onChange={(e) => setTwoFactorKey(e.target.value)}
                        />
                        <div className={style.errorMessage}>
                            {twoFAErrorMessage && (
                                <Typography color="error">
                                    {twoFAErrorMessage}
                                </Typography>
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handle2FAClose}>Cancel</Button>
                        <Button onClick={handle2FASubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </div>
    );
};

export default Login;
