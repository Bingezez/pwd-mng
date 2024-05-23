import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Manager from "./components/Manager/Manager";
import Registration from "./components/Registration/Registration";

const App = () => {
    return (
        <div className="container">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
