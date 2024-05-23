const { body } = require("express-validator");

const userValidator = [
    body("fullName").isString().withMessage("Wrong fullName"),
    body("email").isEmail().withMessage("Wrong email"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be 8 symbols!"),
];

exports.userValidator = userValidator;
