import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Task from './models/tasks.js';
import taskRoutes from './routes/TaskRoutes.js'; 


const port = process.env.PORT;
const db = process.env.MONGO_URL;
const app=express();
app.use(cors());
app.use(express.json()); 
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));
app.use('/home',taskRoutes);

app.listen(port,()=>{
    console.log("listening")
})

