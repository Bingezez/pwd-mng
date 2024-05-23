const chipherRouter = require("express").Router();

const controller = require("./chipher.controller");
const middleware = require("./chipher.middleware");

const authMiddleware = require("../auth/auth.middleware");

chipherRouter.use("/", authMiddleware.validateAccessToken);

chipherRouter.post("/", middleware.isKeyAndIvExists, controller.generateData);

chipherRouter.get("/", middleware.ifKeyAndIvExists, controller.getData);

chipherRouter.put("/", middleware.ifKeyAndIvExists, controller.updateData);

module.exports = {
    chipherRouter,
};
