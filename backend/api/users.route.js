import express from 'express';
import usersCtrl from './users.controller.js';
import checklistsCtrl from './checklists.controller.js';

const router = express.Router();

router.route('/').get(usersCtrl.apiGetUsers);
router.route('/id/:id').get(usersCtrl.apiGetUserById);

router
    .route('/checklist')
    .post(checklistsCtrl.apiPostChecklist)
    .put(checklistsCtrl.apiUpdateChecklist)
    .delete(checklistsCtrl.apiDeleteChecklist)

export default router;