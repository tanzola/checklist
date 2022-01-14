import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let checklists

export default class checklistsDAO {
    static async injectDB(conn) {
        if (checklists) { return; }
        try { checklists = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants"); }
        catch (e) { console.error(`Unable to establish a collection handle in checklistsDAO: ${e}`); }
    }

    static async getChecklists() {
        let query;
        let cursor;

        try { cursor = await checklists.find(query); }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { checklistsList: [], totalNumChecklists: 0 };
        }

        try {
            const checklistsList = await cursor.toArray();
            const totalNumChecklists = await checklists.countDocuments(query);
            return { checklistsList, totalNumChecklists };
        }
        catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { checklistsList: [], totalNumChecklists: 0 };
        }
    }
    static async getChecklistByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                }
            ]
            return await checklists.aggregate(pipeline).next();
        } catch (e) {
            console.error(`Something went wrong in getChecklistsByID: ${e}`);
            throw e;
        }
    }
}


