const userService = require("./user.service");

const { userSchema } = require("./user.validator");
const { BadRequestError } = require("../../errors/apiError");

module.exports = {
    getUserDynamically:
        (paramName, from, dbField = paramName) =>
        async (req, res, next) => {
            try {
                console.log(req[from][paramName], dbField);
                const user = await userService.getUsersByParams({
                    [dbField]: req[from][paramName],
                });

                if (!user) {
                    throw new NotFoundError("User is not found!");
                }

                req.locals = { ...req.locals, user };

                next();
            } catch (e) {
                next(e);
            }
        },

    checkIsUserExistsByEmail: async (req, res, next) => {
        try {
            console.log(req.body);
            const user = await userService.getUsersByEmail(req.body.email);
            
            if (user) {
                throw new BadRequestError("User is found!");
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    userValidator: (req, res, next) => {
        try {
            const { error, value } = userSchema.validate(req.body);

            if (error) {
                throw new BadRequestError(error);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
