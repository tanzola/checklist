import http from '../http-common';

class UserDataService {
    getById(id) {
        return http.get(`users/id/${id}`);
    }

    getByPID(pid) {
        return http.get(`users/pid/${pid}`);
    }

    createUser(data) {
        return http.post("users/user-add", data);
    }

    updateUser(data) {
        return http.put("users/user-update", data);
    }

    deleteUser(id, userId) {
        return http.delete(`users/user-delete`, { data: { _id: id, userId: userId } });
    }
}

export default new UserDataService();
