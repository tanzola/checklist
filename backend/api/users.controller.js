import usersDAO from "../dao/usersDAO.js";

export default class usersController {

    static async apiPostUser(req, res, next) {
        try {
            const userResponse = await usersDAO.addUser(req);
            res.json(userResponse);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetUsers(req, res, next) {
        const { usersList, totalNumusers } = await usersDAO.getUsers();
        let response = {
            users: usersList,
            total_results: totalNumusers,
        };
        res.json(response);
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const userResponse = await usersDAO.updateUser(req);
            var { error } = userResponse;
            if (error) { res.status(400).json({ error }); }
            if (userResponse.modifiedCount === 0) { throw new Error("unable to update checklist - user may not be original poster"); }
            res.json(userResponse);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetUserById(req, res, next) {
        try {
            let id = req.params.id || {};
            let user = await usersDAO.getUserByID(id);
            if (!user) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(user);
        }
        catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetUserByPID(req, res, next) {
        try {
            let pid = req.params.pid || {};
            let user = await usersDAO.getUserByPID(pid);
            if (!user) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(user);
        }
        catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}
