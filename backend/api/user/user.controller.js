const service = require("./user.service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await service.getAllUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getMyProfile: async (req, res, next) => {
        try {
            const user = await service.getUserById(req.user);
            
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            await service.createUser(req.body);

            res.json({ message: "User is created!" });
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            await service.updateUserById(req.params.userId, req.body);

            res.json({ message: "User is updated!" });
        } catch (e) {
            next(e);
        }
    },
};
