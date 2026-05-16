import express from 'express';
import { createCommunity, getAllCommunity, getSingleCommunity, joinCommunity, removeCommunity } from '../controller/community.Controller.js';

const router = express.Router();
router.post('/createcommunity', createCommunity)
router.get('/getallcommunity',getAllCommunity)
router.get('/getsinglecommunity/:id',getSingleCommunity)
router.get('/joincommunity/:communityId',joinCommunity)
router.get('/removecommunity/:communityId',removeCommunity)
export default router;