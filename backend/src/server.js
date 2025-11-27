import express, { json } from 'express'
import dotenv from 'dotenv'
import path from 'path'

import { connectDb } from './lib/db.js';

const app = express()
app.use(express.json())

dotenv.config()
const port = process.env.PORT;

const _dirname = path.resolve();



if(process.env.NODE_ENV ==='production'){
    app.use(express.static( path.join( _dirname ,"../frontend/dist")));

    app.get(/.*/ , (req,res)=>{
        res.sendFile(path.join(_dirname,"../frontend" , "dist" ,"index.html"));
    })
}

app.listen(port , ()=>{
    console.log(`Server is listening to port ${port}`);
    connectDb();
});