import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let tasks;
let task_id;

export default class TasksDAO {

    static async injectDB(conn) {
        if (tasks) { return; }
        try { tasks = await conn.db(process.env.USERS_NS).collection("tasks"); }
        catch (e) { console.error(`Unable to establish collection handles in userDAO: ${e}`); }
    }

    static async addTask(req) {
        try {
            const addResponse = await tasks.insertOne(
                {
                    _id: ObjectId(),
                    user_id: ObjectId(req.body.user_id),
                    checklist_id: ObjectId(req.body.checklist_id),
                    text: req.body.text,
                    status: req.body.status
                }
            );
            return addResponse;
        }
        catch (e) {
            console.error(`Unable to post task: ${e}`);
            return { error: e };
        }
    }

    static async updateTask(req) {
        try {
            task_id = { user_id: ObjectId(req.body.user_id), _id: ObjectId(req.body._id) };
            req.body.items.map(item => ( item.key = ObjectId(item.key) ));
            const updateResponse = await tasks.updateOne(
                task_id,
                {
                    $set: {
                        name: req.body.name,
                        items: req.body.items
                    }
                }
            );
            return updateResponse;
        }
        catch (e) {
            console.error(`Unable to update task: ${e}`);
            return { error: e };
        }
    }

    static async deleteTask(req) {
        try {
            task_id = { user_id: ObjectId(req.body.user_id), _id: ObjectId(req.body._id) };
            const deleteResponse = await tasks.deleteOne(task_id);
            return deleteResponse;
        }
        catch (e) {
            console.error(`Unable to delete task: ${e}`);
            return { error: e };
        }
    }
}
