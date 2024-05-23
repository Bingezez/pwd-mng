const ChipherAes = require("../../dataBase/ChipherAes");

module.exports = {
    newData: async (key, iv, userId) => {
        ChipherAes.create({ key, iv, _userId: userId });
    },

    getDataByUserId: async (userId) =>
        await ChipherAes.find({ _userId: userId }),

    updateData: async (userId, updateData) => {
        await ChipherAes.findByIdAndUpdate(userId, updateData);
    },
};
