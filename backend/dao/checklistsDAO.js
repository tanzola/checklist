import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

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
            const checklistDoc = {
                user_id: req.body.user_id,
                name: req.body.name,
                text: req.body.text
            };
            return await checklists.insertOne(checklistDoc);
        }
        catch (e) {
            console.error(`Unable to post checklist: ${e}`);
            return { error: e };
        }
    }

    static async updateChecklist(req) {
        try {
            checklist_id = { user_id: req.body.user_id, _id: ObjectId(req.body.checklist_id) };
            const updateResponse = await checklists.updateOne(
                checklist_id,
                { $set: {
                    name: req.body.name,
                    text: req.body.text
                } }
            );
            return updateResponse;
        }
        catch (e) {
            console.error(`Unable to update checklist: ${e}`);
            return { error: e };
        }
    }

    static async deleteChecklist(req) {
        try {
            checklist_id = { user_id: req.body.user_id, _id: ObjectId(req.body.checklist_id) };
            const deleteResponse = await checklists.deleteOne(checklist_id);
            return deleteResponse;
        }
        catch (e) {
            console.error(`Unable to delete checklist: ${e}`);
            return { error: e };
        }
    }
}
