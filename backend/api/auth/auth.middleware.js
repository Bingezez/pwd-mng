const { UnauthorizedError } = require("../../errors/apiError");

const service = require("./auth.service");
const oauthService = require("../../services/oauth.service");

module.exports = {
    validateAccessToken: async (req, res, next) => {
        try {
            const token = req.get("Authorization");

            if (!token) {
                throw new UnauthorizedError("No token");
            }

            oauthService.validateTokenDynamically("accessToken", token);

            const tokenWithUser = await service.getByParams({
                accessToken: token,
            });

            console.log(tokenWithUser);

            if (!tokenWithUser) {
                throw new UnauthorizedError("Invalid token");
            }

            req.user = tokenWithUser._userId;
            next();
        } catch (e) {
            next(e);
        }
    },
    validateRefreshToken: async (req, res, next) => {
        try {
            const token = req.get("Authorization");

            if (!token) {
                throw new UnauthorizedError("No token");
            }

            oauthService.validateTokenDynamically("refreshToken", token);

            const tokenWithUser = await service.getByParams({
                refreshToken: token,
            });

            if (!tokenWithUser) {
                throw new UnauthorizedError("Invalid token");
            }

            req.user = tokenWithUser._userId;
            next();
        } catch (e) {
            next(e);
        }
    }
};
