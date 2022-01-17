import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class usersDAO {

    static async injectDB(conn) {
        if (users) { return; }
        try { users = await conn.db(process.env.USERS_NS).collection("users"); }
        catch (e) { console.error(`Unable to establish a collection handle in usersDAO: ${e}`); }
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
            const pipeline = [{ $match: { _id: new ObjectId(id) } }];
            return await users.aggregate(pipeline).next();
        }
        catch (e) {
            console.error(`Something went wrong in getUsersByID: ${e}`);
            throw e;
        }
    }
}
