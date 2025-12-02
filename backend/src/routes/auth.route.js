import express from 'express'
import { signup, login, logout, updateProfilePic, getCurrentUser } from '../controllers/auth.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js'

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout' , logout);
authRouter.get('/current-user',verifyJWT , getCurrentUser);
authRouter.patch('/update-profile-pic', verifyJWT, updateProfilePic);


export default authRouter;