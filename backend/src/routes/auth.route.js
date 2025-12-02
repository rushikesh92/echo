import express from 'express'
import { signup, login, logout } from '../controllers/auth.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js'

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout' , logout);

export default authRouter;