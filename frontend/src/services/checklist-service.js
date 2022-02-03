import http from '../http-common';

class ChecklistDataService {
    get(data) {
        return http.get(`users/id/${data.userId}/checklist/${data.checklistId}`);
    }

    createChecklist(data) {
        return http.post("users/checklist-add", data);
    }

    updateChecklist(data) {
        return http.put("users/checklist-update", data);
    }

    deleteChecklist(data) {
        return http.delete(`/users/id/${data.userId}/checklist-delete/${data.checklistId}`);
    }
}

export default new ChecklistDataService();
