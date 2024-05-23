const crypto = require("crypto");

const service = require("./chipher.service");

const aes = require("../../services/aes.service");

module.exports = {
    generateData: async (req, res, next) => {
        try {
            const generateRandomBytes = async (length) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(length, (err, buf) => {
                        if (err) reject(err);
                        else resolve(buf);
                    });
                });
            };

            const key = await generateRandomBytes(32);
            const iv = await generateRandomBytes(16);

            await service.newData(
                key.toString("hex"),
                iv.toString("hex"),
                req.user
            );

            res.json({ message: "Generated!" });
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

    updateData: async (req, res, next) => {
        try {
            const generateRandomBytes = async (length) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(length, (err, buf) => {
                        if (err) reject(err);
                        else resolve(buf);
                    });
                });
            };

            const key = await generateRandomBytes(32);
            const iv = await generateRandomBytes(16);

            const data = {
                _userId: req.body.userId,
                key: key.toString("hex"),
                iv: iv.toString("hex"),
            };

            console.log(req.locals)

            await service.updateData(req.locals, data);

            res.json({ message: "Updated!" });
        } catch (e) {
            next(e);
        }
    },
};
