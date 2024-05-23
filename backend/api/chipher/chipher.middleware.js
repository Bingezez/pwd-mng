const chipherService = require("./chipher.service");

const { newError } = require("../../errors/apiError");

module.exports = {
    isKeyAndIvExists: async (req, res, next) => {
        try {
            const data = await chipherService.getDataByUserId(req.user);

            if (data.length === 0) {
                req.locals = { ...req.locals, data };
            } else {
                throw new newError("Data is already exists!", 400); 
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    ifKeyAndIvExists: async (req, res, next) => {
        try {
            const data = await chipherService.getDataByUserId(req.user);

            if (data.length !== 0) {
                req.locals = { ...req.locals, data };
            } else {
                throw new newError("Data is not exists!", 400); 
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
