const service = require("./auth.service");
const userService = require("../user/user.service");
const oauthService = require("../../services/oauth.service");
const twoFactorAuthSer = require("../twoFactorAuth/twoFactorAuth.service");

const { NO_CONTENT } = require("../../errors/error.codes");
const { FRONTEND_URL } = require("../../configs/variables");
const {
    FORGOT_PASSWORD: forgotPasswordAction,
} = require("../../configs/actionTokenType.enum");

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const user = req.locals.user;

            await oauthService.checkHashPassword(
                req.body.password,
                user.password
            );

            const { password, ...userData } = user._doc;

            const token = oauthService.generateTokenFor2FA(userData);
            // send token to email
            const code = Math.floor(Math.random() * 1000000);
            console.log(code);

            await twoFactorAuthSer.createAuthForUser(token, code, userData._id);
            res.json({ message: "Send this token to telegram bot", token });
        } catch (e) {
            next(e);
        }
    },

    AuthLoginUser: async (req, res, next) => {
        try {
            const user = req.locals.user;
            await oauthService.checkHashPassword(
                req.body.password,
                user.password
            );

            const { password, ...userData } = user._doc;

            const get2FA = await twoFactorAuthSer.getDataByUserId(userData._id);

            if (get2FA[0].code !== req.body.code) {
                throw new BadRequestError("Code is wrong");
            }
            console.log(get2FA[0]._id);
            await twoFactorAuthSer.deleteData(get2FA[0]._id);

            const tokenPair = oauthService.generateAccessTokenPair({
                ...userData,
            });

            await service.createOauthPair({
                ...tokenPair,
                _userId: userData._id,
            });

            await twoFactorAuthSer.deleteData(get2FA[0]._id);
            res.json({ ...tokenPair, _userId: userData._id });
        } catch (e) {
            next(e);
        }
    },

    refreshUser: async (req, res, next) => {
        try {
            const user = req.user;
            const refreshToken = req.get("Authorization");

            await service.deleteOneByParams({ refreshToken });

            const newTokenPair = oauthService.generateAccessTokenPair({
                ...user,
            });

            await service.createOauthPair({
                ...newTokenPair,
                _userId: user._id,
            });
            res.json({ ...newTokenPair, _userId: user._id });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const accessToken = req.get("Authorization");
            console.log(accessToken);
            await service.deleteOneByParams({ accessToken });

            res.status(NO_CONTENT).send("Logout");
        } catch (e) {
            next(e);
        }
    },
};
