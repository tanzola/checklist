import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let tasks;
let taskId;

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
                    userId: ObjectId(req.body.userId),
                    checklistId: ObjectId(req.body.checklistId),
                    text: req.body.text,
                    stage: req.body.stage
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
            taskId = { userId: ObjectId(req.body.userId), _id: ObjectId(req.body._id) };
            const updateResponse = await tasks.updateOne(
                taskId,
                {
                    $set: {
                        text: req.body.text,
                        stage: req.body.stage
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
            taskId = { userId: ObjectId(req.body.userId), _id: ObjectId(req.body._id) };
            const deleteResponse = await tasks.deleteOne(taskId);
            return deleteResponse;
        }
        catch (e) {
            console.error(`Unable to delete task: ${e}`);
            return { error: e };
        }
    }
}
