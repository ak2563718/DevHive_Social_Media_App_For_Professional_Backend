import express from 'express';
import { getPostVotes, manageVotes } from '../controller/vote.Controller.js';
import { authmiddleware } from '../middlewares/auth.Middleware.js';
const router = express.Router();

router.post('/managevote/:postId',authmiddleware,manageVotes)
router.get('/countvote/:postId',getPostVotes)

export default router;