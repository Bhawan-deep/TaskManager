import express from 'express';
import Task from '../models/tasks.js';
const router= express.Router()
router.post("/addTask", async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("Task was added");
    console.log("Title:", title);
    console.log("Description:", description);
    const newTask = new Task({title:title, description:description });
    await newTask.save();
    res.status(201).json({ msg: "Task added", task: newTask });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ msg: "Failed to add task", error: err.message });
  }
});
router.get("/fetchData", async (req, res) => {
  try {
    const tasks = await Task.find(); 
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.delete('/delete/:id',async(req,res)=>{
    try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ msg: "Task deleted", task: deletedTask });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Server error" });
  }

})
router.get("/UpdateTask/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.put('/UpdateTask/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Server error during update" });
  }
});
export default router;