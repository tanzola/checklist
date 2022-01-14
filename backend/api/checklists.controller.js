import checklistsDAO from "../dao/checklistsDAO.js"

export default class checklistsController {
    
  static async apiGetChecklists(req, res) {
    const { checklistsList, totalNumchecklists } = await checklistsDAO.getChecklists();
    let response = {
      checklists: checklistsList,
      total_results: totalNumchecklists,
    };
    res.json(response);
  }

  static async apiGetChecklistById(req, res) {
    try {
      let id = req.params.id || {};
      let checklist = await checklistsDAO.getChecklistByID(id);
      if (!checklist) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(checklist);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
