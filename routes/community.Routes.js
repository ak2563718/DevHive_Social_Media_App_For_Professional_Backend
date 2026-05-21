import express from 'express';
import { createCommunity, getAllCommunity, getSingleCommunity, joinCommunity, removeCommunity } from '../controller/community.Controller.js';
import { authmiddleware } from '../middlewares/auth.Middleware.js';

const router = express.Router();
router.post('/createcommunity',authmiddleware, createCommunity)
router.get('/getallcommunity',getAllCommunity)
router.get('/getsinglecommunity/:id',authmiddleware,getSingleCommunity)
router.get('/joincommunity/:communityId',authmiddleware,joinCommunity)
router.get('/removecommunity/:communityId',authmiddleware,removeCommunity)

export default router;