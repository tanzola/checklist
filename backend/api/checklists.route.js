import express from 'express';
import checklistsCtrl from './checklists.controller.js';

const router = express.Router();

router.route('/').get(checklistsCtrl.apiGetChecklists);

export default router;