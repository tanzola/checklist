import express from 'express';
import usersCtrl from './users.controller.js';
import checklistsCtrl from './checklists.controller.js';
import tasksCtrl from './tasks.controller.js';

const router = express.Router();

router.route('/').get(usersCtrl.apiGetUsers);
router.route('/id/:id').get(usersCtrl.apiGetUserById);

router.route('/pid/:id').get(usersCtrl.apiGetUserByPId);
router.post('/user-add', usersCtrl.apiPostUser)
// router.delete('/user-delete', usersCtrl.apiDeleteUser)
router.put('/user-update', usersCtrl.apiUpdateUser)

router.route('/id/:id/checklist/:checklist_id').get(checklistsCtrl.apiGetChecklistById);

router.post('/checklist-add', checklistsCtrl.apiPostChecklist)
router.delete('/checklist-delete', checklistsCtrl.apiDeleteChecklist)
router.put('/checklist-update', checklistsCtrl.apiUpdateChecklist)



router.post('/task-add', tasksCtrl.apiPostTask)
router.delete('/task-delete', tasksCtrl.apiDeleteTask)
router.put('/task-update', tasksCtrl.apiUpdateTask)


export default router;