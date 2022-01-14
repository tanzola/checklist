import checklistsDAO from "../dao/checklistsDAO.js"

export default class checklistsController {
  static async apiGetChecklists(req, res, next) {
    const checklistsPerPage = req.query.checklistsPerPage ? parseInt(req.query.checklistsPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { checklistsList, totalNumchecklists } = await checklistsDAO.getChecklists({
      filters,
      page,
      checklistsPerPage,
    });

    let response = {
      checklists: checklistsList,
      page: page,
      filters: filters,
      entries_per_page: checklistsPerPage,
      total_results: totalNumchecklists,
    };
    res.json(response);
  }
  static async apiGetChecklistById(req, res, next) {
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

  static async apiGetChecklistCuisines(req, res, next) {
    try {
      let cuisines = await checklistsDAO.getCuisines();
      res.json(cuisines);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}