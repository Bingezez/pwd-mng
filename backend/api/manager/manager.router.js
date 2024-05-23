const managerRouter = require("express").Router();

const controller = require("./manager.controller");
const middleware = require("./manager.middleware");
const authMiddleware = require("../auth/auth.middleware");
const chipherMiddleware = require("../chipher/chipher.middleware");

// add password for manager.

managerRouter.use("/", authMiddleware.validateAccessToken);

managerRouter.get("/", chipherMiddleware.ifKeyAndIvExists, controller.getData);

managerRouter.post(
    "/",
    chipherMiddleware.ifKeyAndIvExists,
    middleware.isPasswordExists,
    controller.addData
);

managerRouter.put("/", controller.updateData);

managerRouter.delete("/", controller.deleteData);

managerRouter.get(
    "/data",
    chipherMiddleware.ifKeyAndIvExists,
    controller.getDataById
);

module.exports = {
    managerRouter,
};
