import express from 'express'
import dotenv from 'dotenv'

import authRouter from './routes/auth.route.js';
import { connectDb } from './lib/db.js';

const app = express()

dotenv.config()
const port = process.env.PORT;

app.get('/' , (req,res)=>{
    res.send('hello there');
})


app.listen(port , ()=>{
    console.log(`Server is listening to port ${port}`);
    connectDb();
});