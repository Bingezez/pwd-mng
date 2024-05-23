import React from "react";

import style from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={style.root}>
            <div className={style.inner}>
                <p>&copy; {new Date().getFullYear()} Password Manager</p>
            </div>
        </div>
    );
};

export default Footer;
