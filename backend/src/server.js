import express, { json } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { connectDb } from './lib/db.js';

const app = express()
app.use(express.json({ limit: "5mb" }))
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));

dotenv.config()
const port = process.env.PORT;

const _dirname = path.resolve();

import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, "../frontend/dist")));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(port, () => {
     connectDb();
    console.log(`Server is listening to port ${port}`);
});