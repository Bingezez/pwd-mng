import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "js-cookie";
import style from "./Header.module.css";

const Header = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("accessToken");
        
        if (token) {
            axios
                .get("http://localhost:5050/api/user/my", {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                    setIsAuth(true);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    setIsAuth(false);
                });
        }
    }, []);

    const onClickLogout = () => {
        const token = Cookies.get("accessToken");
        if (token) {
            axios
                .post(
                    "http://localhost:5050/api/auth/logout",
                    {},
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                )
                .then(() => {
                    Cookies.remove("accessToken");
                    setIsAuth(false);
                    setUser(null);
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.error("Error logging out:", error);
                });
        }
    };

    return (
        <div className={style.root}>
            <div className={style.inner}>
                <a className={style.logo} href="/">
                    P-Manager
                </a>
                {isAuth && location.pathname !== "/manager" && (
                    <a href="/manager">
                        <Button variant="contained">Manager</Button>
                    </a>
                )}
                <div className={style.buttons}>
                    {isAuth ? (
                        <>
                            <span className={style.userName}>
                                {user ? (
                                    `${user.firstName} ${user.lastName}`
                                ) : (
                                    <span className={style.loading}>
                                        Loading...
                                    </span>
                                )}
                            </span>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={onClickLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <a href="/login">
                                <Button variant="contained">Login</Button>
                            </a>
                            <a href="/registration">
                                <Button variant="contained" color="success">
                                    Register
                                </Button>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
