import express, { Router } from 'express';
import { createUser } from '../controller/userController.js';

const router = express.Router();
router.post('/createuser',createUser)
export default router;