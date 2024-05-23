const TwoFactorAuth = require("../../dataBase/TwoFactorAuth");

module.exports = {
    createAuthForUser: async (token, code, userId) => {
        TwoFactorAuth.create({ token, code, _userId: userId });
    },

    getDataByUserId: async (userId) =>
        await TwoFactorAuth.find({ _userId: userId }),

    deleteData: async (dataId) => {
        await TwoFactorAuth.findByIdAndDelete(dataId);
    },

    deleteDataByToken: async (token) => {
        await TwoFactorAuth.findOneAndDelete({ token });
    }
};
