import http from '../http-common';

class UserDataService {
    get(id) {
        return http.get(`/users/id/${id}`);
    }

    createUser(data) {
        return http.post("/users/user-add", data);
    }

    updateUser(data) {
        return http.put("/users/user-update", data);
    }

    deleteUser(id, userId) {
        return http.delete(`users/user-delete`, { data: { _id: id, user_id: userId } });
    }
}

export default new UserDataService();
