
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Task from './models/tasks.js';
import taskRoutes from './routes/TaskRoutes.js'; 


const app=express();
app.use(cors());
app.use(express.json()); 





mongoose.connect("mongodb+srv://bhawandeepsingh976:MilanPreet143@taskmanager.x4esatb.mongodb.net/?retryWrites=true&w=majority&appName=taskmanager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));
app.use('/home',taskRoutes);

app.listen(8000,()=>{
    console.log("listening")
})

