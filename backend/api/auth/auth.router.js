const authRouter = require("express").Router();
const controller = require("./auth.controller");

const middleware = require("./auth.middleware");
const userMiddleware = require("../user/user.middleware");
const twoFactorAuthMiddleware = require("../twoFactorAuth/twoFactorAuth.middleware");

authRouter.post(
    "/logout",
    middleware.validateAccessToken,
    controller.logoutUser
); // +

authRouter.post(
    "/refresh",
    middleware.validateRefreshToken,
    controller.refreshUser
);

authRouter.post(
    "/",
    userMiddleware.getUserDynamically("email", "body"),
    twoFactorAuthMiddleware.ifCreateTokenYouNeedDelete,
    controller.loginUser
); // +

authRouter.post(
    "/login",
    userMiddleware.getUserDynamically("email", "body"),
    twoFactorAuthMiddleware.tokenIsExist,
    controller.AuthLoginUser
); // +

module.exports = {
    authRouter,
};
