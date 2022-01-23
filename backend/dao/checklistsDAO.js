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
            req.body.items.map(item => (
                item.key = ObjectId()
            ))

            const checklistDoc = {
                user_id: ObjectId(req.body.user_id),
                name: req.body.name,
                text: req.body.text,
                items: req.body.items
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
            console.log(1);
            checklist_id = { user_id: ObjectId(req.body.user_id), _id: ObjectId(req.body._id) };
            console.log(req.body._id);
            console.log(req.body.user_id);
            console.log(2);
            const deleteResponse = await checklists.deleteOne(checklist_id);
            console.log(3);
            return deleteResponse;
        }
        catch (e) {
            console.error(`Unable to delete checklist: ${e}`);
            return { error: e };
        }
    }
}
