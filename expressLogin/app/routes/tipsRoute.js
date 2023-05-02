import express from 'express';

import { addTip,getAllTips,deleteTip} from '../controllers/tipsController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// tips Routes

router.post('/addTip', verifyAuth, addTip);
router.get('/showAllTips', verifyAuth, getAllTips);
router.get('/deleteTip/:tip_id',verifyAuth,deleteTip);
export default router;