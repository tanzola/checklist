import express from 'express';
import usersCtrl from './users.controller.js';
import checklistsCtrl from './checklists.controller.js';
import tasksCtrl from './tasks.controller.js';

const router = express.Router();

router.route('/').get(usersCtrl.apiGetUsers);
router.route('/id/:id').get(usersCtrl.apiGetUserById);

router.route('/pid/:pid').get(usersCtrl.apiGetUserByPID);
router.post('/user-add', usersCtrl.apiPostUser);
router.put('/user-update', usersCtrl.apiUpdateUser);

router.route('/id/:id/checklist/:checklistId').get(checklistsCtrl.apiGetChecklistById);

router.post('/checklist-add', checklistsCtrl.apiPostChecklist);
router.put('/checklist-update', checklistsCtrl.apiUpdateChecklist);

router.post('/task-add', tasksCtrl.apiPostTask);
router.delete('/id/:userId/task-delete/:taskId', tasksCtrl.apiDeleteTask);
router.put('/task-update', tasksCtrl.apiUpdateTask);

export default router;
