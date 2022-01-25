import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let parms;
let users;

export default class usersDAO {

    static async injectDB(conn) {
        if (users) { return; }
        try { users = await conn.db(process.env.USERS_NS).collection("users"); }
        catch (e) { console.error(`Unable to establish a collection handle in usersDAO: ${e}`); }
    }

    static async addUser(req) {
        console.log(`request: ${req.body.pid}`)
        try {
            console.log("attempting2")
            parms = {
                _id: new mongodb.ObjectId(),
                name: req.body.name,
                pid: req.body.pid
            };
            const addResponse = await users.insertOne(parms);
            return addResponse;
        }
        catch (e) {
            console.error(`Unable to post user: ${e}`);
            return { error: e };
        }
    }

    static async getUsers() {
        let query;
        try {
            let cursor = await users.find(query);
            const usersList = await cursor.toArray();
            const totalNumUsers = await users.countDocuments(query);
            return { usersList, totalNumUsers };
        }
        catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { usersList: [], totalNumUsers: 0 };
        }
    }

    static async getUserByID(id) {
        try {
            const pipeline = [
                {
                    $match: { _id: new ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "checklists",
                        let: { id: "$_id", },
                        pipeline: [{ $match: { $expr: { $eq: ["$user_id", "$$id"] } } }],
                        as: "checklists"
                    }
                },
                {
                    $addFields: { checklists: "$checklists" }
                }
            ];
            return await users.aggregate(pipeline).next();
        }
        catch (e) {
            console.error(`Something went wrong in getUsersByID: ${e}`);
            throw e;
        }
    }

    static async getUserByPID(id) {
        try {
            const pipeline = [
                {
                    $match: { pid: id }
                }
            ];
            return await users.aggregate(pipeline).next();
        }
        catch (e) {
            console.error(`Something went wrong in getUsersByID: ${e}`);
            throw e;
        }
    }
}
