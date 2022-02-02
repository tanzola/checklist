import http from '../http-common';

class TaskDataService {
    get(data) {
        return http.get(`users/id/${data.userId}/task/${data._id}`);
    }

    createTask(data) {
        return http.post("/users/task-add", data);
    }

    updateTask(data) {
        return http.put("/users/task-update", data);
    }

    deleteTask(id, userId) {
        return http.delete(`users/task-delete`, { data: { _id: id, userId: userId } });
    }
}

export default new TaskDataService();
