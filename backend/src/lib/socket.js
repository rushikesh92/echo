import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import { socketAuthMiddleware } from '../middleware/socketAuth.middleware.js';

const app = express();
const server = http.createServer(app);

const io = new Server( server,{
    cors:{
        origin: [process.env.CLIENT_URL],
        credentials:true
    }
});
console.log("Socket.IO server initialized");


io.use(socketAuthMiddleware);

const onlineUsersMap = {};

io.on("connection",(socket)=>{
    console.log("A user connected :", socket.user.fullName);

    const userId = socket.userId;
    onlineUsersMap[userId] = socket.id;//add user to online users

    //send updated online users to all connected client
    io.emit("onlineUsers",Object.keys(onlineUsersMap));

    socket.on("disconnect",()=>{
        console.log("A user disconnected", socket.user.fullName);
        delete onlineUsersMap[userId];
        io.emit("onlineUsers", Object.keys(onlineUsersMap));
    })

});

export {io,server,app};


