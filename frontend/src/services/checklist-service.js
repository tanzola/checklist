import http from '../http-common';

class ChecklistDataService {
    get(data) {
        return http.get(`/users/id/${data.userId}/checklist/${data.checklistId}`);
    }

    createChecklist(data) {
        return http.post("/users/checklist-add", data);
    }

    updateChecklist(data) {
        return http.put("/users/checklist-update", data);
    }

    deleteChecklist(id, userId) {
        return http.delete(`users/checklist-delete`, { data: { _id: id, user_id: userId } });
    }
}

export default new ChecklistDataService();