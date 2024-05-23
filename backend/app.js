const cors = require('cors');
const path = require("node:path");
const express = require("express");
const mongoose = require("mongoose");

const code = require("./errors/error.codes");

require("dotenv").config({
    path: path.join(
        __dirname,
        "env",
        `.env.${process.env.NODE_ENV || "local"}`
    ),
}); // check more info about .env and .env.prod (other .env files)
global.rootPath = __dirname;

const { newError } = require("./errors/apiError");
const { mainRouter } = require("./api/api.router");
const { PORT, TOKEN_MONGOOSE } = require("./configs/variables");

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);
app.use("/*", _notFoundError);
app.use(mainErrorHandler);

app.listen(PORT, () => {
    console.log(`App listen http://localhost:${PORT} port.`);

    mongoose.set("debug", true);
    // mongoose.set("strictQuery", true);
    mongoose
        .connect(TOKEN_MONGOOSE)
        .then(() => {
            console.log("You Connected in Mongodb!");
        })
        .catch((e) => {
            console.log("You not Connected in Mongodb! :", e);
        });
});

function _notFoundError(req, res, next) {
    next(new newError("Route not found!", code.NOT_FOUND));
}

function mainErrorHandler(err, req, res, next) {
    console.log(err);
    res.status(err.status || code.INTERNAL_SERVER_ERROR).json({
        message: err.message || "Unknown error",
    });
}
