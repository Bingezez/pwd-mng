const mongoose = require("mongoose");

const secureFields = ["password"];

const UserScheme = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            default: "",
        },
        lastName: {
            type: String,
            trim: true,
            default: "",
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                for (const field of secureFields) {
                    delete ret[field];
                }

                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: (doc, ret) => {
                for (const field of secureFields) {
                    delete ret[field];
                }

                return ret;
            },
        },
    }
);

UserScheme.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

module.exports = mongoose.model("User", UserScheme);
