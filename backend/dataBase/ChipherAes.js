const mongoose = require("mongoose");

const ChipherAesSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            trim: true,
            required: true,
        },
        iv: {
            type: String,
            trim: true,
            required: true,
        },
        _userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model("ChipherAes", ChipherAesSchema);
