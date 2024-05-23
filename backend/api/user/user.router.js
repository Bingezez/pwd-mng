const userRouter = require("express").Router();

const controller = require("./user.controller");
const middleware = require("./user.middleware");
const authMiddleware = require("../auth/auth.middleware");

userRouter.use("/", middleware.checkIsUserExistsByEmail); // common middleware for check is user exists by email.

userRouter.get("/", controller.getAllUsers); // get all users.
userRouter.post("/", middleware.userValidator, controller.createUser); // create new user.

userRouter.get(
    "/my",
    authMiddleware.validateAccessToken,
    controller.getMyProfile
);

// By user id (update user, delete user). when I have access token.
// userRouter.put("/", controller.updateUserById);

module.exports = {
    userRouter,
};
