import express from 'express'

const app = express()

app.get('/' , (req,res)=>{
    res.send('hello there');
})

app.listen(8000 , ()=>{
    console.log("App is listening to port 8000");
});