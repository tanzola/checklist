import checklistsDAO from "../dao/checklistsDAO.js"

export default class ChecklistsController {

    static async apiPostChecklist(req, res, next) {
        try {
            const checklistResponse = await checklistsDAO.addChecklist(req);
            res.json(checklistResponse);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateChecklist(req, res, next) {
        try {
            const checklistResponse = await checklistsDAO.updateChecklist(req);
            var { error } = checklistResponse;
            if (error) { res.status(400).json({ error }); }
            if (checklistResponse.modifiedCount === 0) { throw new Error("unable to update checklist - user may not be original poster"); }
            res.json({ status: "success" });
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteChecklist(req, res, next) {
        try {
            const checklistResponse = await checklistsDAO.deleteChecklist(req)
            res.json({ status: "success" });
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetChecklistById(req, res, next) {
        try {
            let userId = req.params.id || {};
            let checklistId = req.params.checklistId
            let checklist = await checklistsDAO.getChecklistByID(userId, checklistId);
            if (!checklist) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(checklist);
        }
        catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}
