const ObjectId = require("mongoose").Types.ObjectId;

const { BadRequestError } = require("../errors/apiError");

module.exports = {
    objectIdValidator: (paramName) => async (req, res, next) => {
        try {
            const isValid = ObjectId.isValid(req.params[paramName]);

            if (!isValid) {
                throw new BadRequestError("ID is not valid");
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
