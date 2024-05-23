const managerService = require("./manager.service");

const { newError } = require("../../errors/apiError");

module.exports = {
    isPasswordExists: async (req, res, next) => {
        try {
            const data = await managerService.findSiteNameAndEmailByUserId(
                req.body.siteName,
                req.body.email,
                req.user
            );

            if (data.length !== 0) {
                throw new newError("Data is already exists!", 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
