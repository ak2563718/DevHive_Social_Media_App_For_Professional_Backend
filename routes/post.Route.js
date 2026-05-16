import express from 'express'
import { createPost, getAllPosts, getPostbyUser, getSinglePost } from '../controller/post.Controller.js';

const router = express.Router();
router.post('/createpost/:communityId',createPost)
router.get('/getallposts',getAllPosts)
router.get('/getsinglepost/:id',getSinglePost)
router.get('/getpostbyuser',getPostbyUser)

export default router;