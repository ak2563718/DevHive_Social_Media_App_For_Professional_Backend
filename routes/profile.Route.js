import express from 'express';
import { getProfile, updateProfile } from '../controller/profile.Controller.js';
import { authmiddleware } from '../middlewares/auth.Middleware.js';

const router = express.Router();
router.patch('/updateprofile/:id',authmiddleware,updateProfile)
router.get('/getprofile',authmiddleware,getProfile)

export default router;