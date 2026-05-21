import express, { Router } from 'express';
import { checklogin, createNewAccessToken, createUser, loginUser, logoutUser } from '../controller/user.Controller.js';

const router = express.Router();
router.post('/signup',createUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.get('/check-session', checklogin)
router.post('/refresh-token', createNewAccessToken)
export default router;
