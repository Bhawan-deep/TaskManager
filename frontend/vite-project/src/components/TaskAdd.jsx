import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/TaskAdd.css"

const TaskAdd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/home/addTask", {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      navigate("/viewTask");
    } catch (error) {
      alert("Error adding task");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="nav-buttons">
        <button onClick={() => navigate("/addTask")}>Add Task</button>
        <button onClick={() => navigate("/viewTask")}>View Task</button>
      </div>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TaskAdd;
