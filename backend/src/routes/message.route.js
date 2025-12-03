import {Router} from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js';
import { getAllChats, getAllContacts, getMessagesOfContact, sendMessage } from "../controllers/message.controller.js";


const messageRouter = Router();

messageRouter.use(verifyJWT);

messageRouter.get("/contacts" , getAllContacts);
messageRouter.get("/chats" , getAllChats);
messageRouter.post("/send/:receiverId" , sendMessage);
messageRouter.get("/:receiverId" , getMessagesOfContact);

export default messageRouter;

 