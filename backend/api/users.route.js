import express from 'express';
import usersCtrl from './users.controller.js';
import checklistsCtrl from './checklists.controller.js';

const router = express.Router();

router.route('/').get(usersCtrl.apiGetUsers);
router.route('/id/:id').get(usersCtrl.apiGetUserById);

router.post('/checklist-add', checklistsCtrl.apiPostChecklist)
router.delete('/checklist-delete', checklistsCtrl.apiDeleteChecklist)
router.put('/checklist-update', checklistsCtrl.apiUpdateChecklist)

export default router;