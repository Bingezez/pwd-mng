const service = require("./manager.service");
const aes = require("../../services/aes.service");

const { encrypt, decrypt } = aes;

const chipherService = require("../chipher/chipher.service");

module.exports = {
    addData: async (req, res, next) => {
        try {
            const data = await chipherService.getDataByUserId(req.user);

            const encryptedPassword = encrypt(
                req.body.password,
                data[0].key,
                data[0].iv
            );

            await service.newData(
                req.body.siteName,
                req.body.email,
                encryptedPassword,
                req.user
            );

            res.json({ message: "Added!" });
        } catch (e) {
            next(e);
        }
    },

    getData: async (req, res, next) => {
        try {
            const data = await service.getDataByUserId(req.user);

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    getDataById: async (req, res, next) => {
        try {
            const data = await chipherService.getDataByUserId(req.user);

            console.log(req.body.id);

            const dataManager = await service.getDataById(req.body.id);

            const decryptedPassword = decrypt(
                dataManager.password,
                data[0].key,
                data[0].iv
            );

            res.json({ ...dataManager._doc, password: decryptedPassword });
        } catch (e) {
            next(e);
        }
    },

    updateData: async (req, res, next) => {
        try {
            await service.updateData(req.body.id, req.body);

            res.json({ message: "Updated!" });
        } catch (e) {
            next(e);
        }
    },

    deleteData: async (req, res, next) => {
        try {
            await service.deleteData(req.body.id);

            res.json({ message: "Deleted!" });
        } catch (e) {
            next(e);
        }
    },
};
