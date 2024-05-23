const Joi = require("joi");
const {
    EMAIL_REGEXP,
    PASSWORD_REGEXP,
} = require("../../configs/regexp.enum");

const userSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(64).trim(),
    lastName: Joi.string().alphanum().min(3).max(64).trim(),

    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .lowercase()
        .trim()
        .error(new Error("Email is not valid")),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim()
        .error(new Error("Password is not valid")),
});

module.exports = {
    userSchema,
};
