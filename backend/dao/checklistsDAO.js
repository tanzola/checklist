import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let parms;
let checklists;
let checklist_id;

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
                user_id: ObjectId(req.body.user_id),
                name: req.body.name,
                tasks: []
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
            checklist_id = { user_id: ObjectId(req.body.user_id), _id: ObjectId(req.body._id) };
            req.body.items.map(item => ( item.key = ObjectId(item.key) ));
            parms = {
                name: req.body.name,
                items: req.body.items
            }
            const updateResponse = await checklists.updateOne( checklist_id, { $set: parms });
            return updateResponse;
        }
        catch (e) {
            console.error(`Unable to update checklist: ${e}`);
            return { error: e };
        }
    }

    static async deleteChecklist(req) {
        try {
            checklist_id = { user_id: ObjectId(req.body.user_id), _id: ObjectId(req.body._id) };
            const deleteResponse = await checklists.deleteOne(checklist_id);
            return deleteResponse;
        }
        catch (e) {
            console.error(`Unable to delete checklist: ${e}`);
            return { error: e };
        }
    }

    static async getChecklistByID(user_id, checklist_id) {
        try {
            const pipeline = [
                {
                    $match: { 
                        _id: new ObjectId(checklist_id),
                        user_id: new ObjectId(user_id)
                     }
                },
                {
                    $lookup: {
                        from: "tasks",
                        let: { id: "$_id", },
                        pipeline: [{ $match: { $expr: { $eq: ["$checklist_id", "$$id"] } } }],
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
