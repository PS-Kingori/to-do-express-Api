import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectDb from './config/db.js';
import userRouter from './routes/users.js';


dotenv.config();


const PORT = process.env.MONGODB_URI

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
   res.send('Hello world from thes server') 
});

connectDb();

app.use('/users', userRouter);


app.listen(PORT, ()=>{
    console.log(`listening from AtlasDB`)
})


