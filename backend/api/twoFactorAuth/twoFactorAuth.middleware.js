const TwoFactorAuth = require("../../dataBase/TwoFactorAuth");

const { BadRequestError } = require("../../errors/apiError");

module.exports = {
    ifCreateTokenYouNeedDelete: async (req, res, next) => {
        try {
            const token = await TwoFactorAuth.findOne({
                _userId: req.locals.user._id,
            });

            if (token) {
                await TwoFactorAuth.findByIdAndDelete(token._id);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    tokenIsExist: async (req, res, next) => {
        try {
            const token = await TwoFactorAuth.findOne({
                _userId: req.locals.user._id,
            });

            if (!token) {
                throw new BadRequestError("Code is bad!");
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
