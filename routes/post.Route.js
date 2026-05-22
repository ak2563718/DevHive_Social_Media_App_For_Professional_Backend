import express from 'express'
import { createPost, getAllPosts, getPostbyUser, getSinglePost, postinsideCommunity } from '../controller/post.Controller.js';
import { authmiddleware } from '../middlewares/auth.Middleware.js';

const router = express.Router();
router.post('/createpost',authmiddleware,createPost)
router.get('/getallposts',getAllPosts)
router.get('/getsinglepost/:id',getSinglePost)
router.get('/getpostbyuser',authmiddleware,getPostbyUser)
router.post('/postincommunity/:communityId',authmiddleware,postinsideCommunity)

export default router;