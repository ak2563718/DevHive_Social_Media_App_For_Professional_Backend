import express from 'express';
import { getPostVotes, manageVotes } from '../controller/vote.Controller.js';
const router = express.Router();

router.post('/managevote/:postId',manageVotes)
router.post('/countvote/:postId',getPostVotes)

export default router;