const oauthService = require("../../services/oauth.service");

const User = require("../../dataBase/User");

module.exports = {
    getAllUsers: async () => await User.find(),

    getUserById: async (userId) => await User.findById(userId),

    getUsersByParams: async (objectParams) => await User.findOne(objectParams),

    getUsersByEmail: async (email) => await User.findOne({ email }),

    createUser: async (userObject) => {
        const hashPassword = await oauthService.hashPassword(
            userObject.password
        );

        await User.create({ ...userObject, password: hashPassword });
    },

    updateUserById: async (userId, user) => {
        await User.findByIdAndUpdate(userId, user, { new: true });
    },
};
