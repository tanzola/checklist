import http from '../http-common';

class TaskDataService {
    get(id) {
        return http.get(`/users/id/${id}`);
    }

    createTask(data) {
        return http.post("/users/task-add", data);
    }

    updateTask(data) {
        return http.put("/users/task-update", data);
    }

    deleteTask(id, userId) {
        return http.delete(`users/task-delete`, { data: { _id: id, user_id: userId } });
    }
}

export default new TaskDataService();