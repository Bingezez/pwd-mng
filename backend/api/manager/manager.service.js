const ManagerPassword = require("../../dataBase/ManagerPassword");

module.exports = {
    newData: async (siteName, email, password, userId) => {
        ManagerPassword.create({ siteName, email, password, _userId: userId });
    },

    getDataByUserId: async (userId) => {
        const managerPassword = await ManagerPassword.find({ _userId: userId });
        return managerPassword;
    },

    updateData: async (dataId, updateData) => {
        await ManagerPassword.findByIdAndUpdate(dataId, updateData, {
            new: true,
        });
    },

    deleteData: async (dataId) => {
        await ManagerPassword.findByIdAndDelete(dataId);
    },

    findSiteNameAndEmailByUserId: async (siteName, email, userId) => {
        const managerPassword = await ManagerPassword.find({
            _userId: userId,
            siteName,
            email,
        });
        return managerPassword;
    },

    getDataById: async (dataId) => {
        const managerPassword = await ManagerPassword.findById(dataId);
        return managerPassword;
    }
};
