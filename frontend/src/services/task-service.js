import http from '../http-common';

class TaskDataService {
    get(data) {
        return http.get(`users/id/${data.userId}/task/${data.taskId}`);
    }

    createTask(data) {
        return http.post("/users/task-add", data);
    }

    updateTask(data) {
        return http.put("/users/task-update", data);
    }

    deleteTask(data) {
        return http.delete(`/users/id/${data.userId}/task-delete/${data.taskId}`);
    }
}

export default new TaskDataService();
