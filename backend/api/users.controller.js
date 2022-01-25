import usersDAO from "../dao/usersDAO.js";

export default class usersController {

    static async apiPostUser(req, res, next) {
        try {
            console.log('-------------')
            console.log(req.body.pid);
            const userResponse = await usersDAO.addUser(req);
            res.json({ status: "success" });
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

    static async apiGetUserByPId(req, res, next) {
        try {
            let id = req.params.id || {};
            let user = await usersDAO.getUserByPID(id);
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
