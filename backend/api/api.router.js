const mainRouter = require("express").Router();

const { authRouter } = require("./auth/auth.router");
const { userRouter } = require("./user/user.router");
const { managerRouter } = require("./manager/manager.router");
const { chipherRouter } = require("./chipher/chipher.router");

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/manager", managerRouter);
mainRouter.use("/chipher", chipherRouter);

module.exports = {
    mainRouter,
};
