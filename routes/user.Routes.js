import express, { Router } from 'express';
import { createNewAccessToken, createUser, loginUser, logoutUser } from '../controller/user.Controller.js';

const router = express.Router();
router.post('/signup',createUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.post('/refresh', createNewAccessToken)
export default router;
