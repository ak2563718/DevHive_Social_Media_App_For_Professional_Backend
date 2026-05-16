import express from 'express';
import { createComment, deleteComment, getallcommentOnpost, updateComment } from '../controller/comment.Controller.js';

const router = express.Router();
router.post('/createcomment/:postId',createComment)
router.get('/getcomment/:postId',getallcommentOnpost)
router.patch('/update/:commentId',updateComment)
router.delete('/delete/:commentId',deleteComment)


export default router;