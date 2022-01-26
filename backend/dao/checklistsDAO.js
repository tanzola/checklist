import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let parms;
let checklists;
let checklistId;

export default class ChecklistsDAO {

    static async injectDB(conn) {
        if (checklists) { return; }
        try { checklists = await conn.db(process.env.USERS_NS).collection("checklists"); }
        catch (e) { console.error(`Unable to establish collection handles in userDAO: ${e}`); }
    }

    static async addChecklist(req) {
        try {
            req.body.items.map(item => ( item.key = ObjectId() ))
            parms = {
                userId: ObjectId(req.body.userId),
                name: req.body.name
            };
            const addResponse = await checklists.insertOne(parms);
            return addResponse;
        }
        catch (e) {
            console.error(`Unable to post checklist: ${e}`);
            return { error: e };
        }
    }

    static async updateChecklist(req) {
        try {
            checklistId = { userId: ObjectId(req.body.userId), _id: ObjectId(req.body._id) };
            req.body.items.map(item => ( item.key = ObjectId(item.key) ));
            parms = {
                name: req.body.name,
                items: req.body.items
            }
            const updateResponse = await checklists.updateOne( checklistId, { $set: parms });
            return updateResponse;
        }
        catch (e) {
            console.error(`Unable to update checklist: ${e}`);
            return { error: e };
        }
    }

    static async deleteChecklist(req) {
        try {
            checklistId = { userId: ObjectId(req.body.userId), _id: ObjectId(req.body._id) };
            const deleteResponse = await checklists.deleteOne(checklistId);
            return deleteResponse;
        }
        catch (e) {
            console.error(`Unable to delete checklist: ${e}`);
            return { error: e };
        }
    }

    static async getChecklistByID(userId, checklistId) {
        try {
            const pipeline = [
                {
                    $match: { 
                        _id: new ObjectId(checklistId),
                        userId: new ObjectId(userId)
                     }
                },
                {
                    $lookup: {
                        from: "tasks",
                        let: { id: "$_id", },
                        pipeline: [{ $match: { $expr: { $eq: ["$checklistId", "$$id"] } } }],
                        as: "tasks"
                    }
                },
                {
                    $addFields: { tasks: "$tasks" }
                }
            ];
            return await checklists.aggregate(pipeline).next();
        }
        catch (e) {
            console.error(`Something went wrong in getChecklistsByID: ${e}`);
            throw e;
        }
    }
}
