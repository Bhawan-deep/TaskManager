import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './css/TaskView.css'; // import the stylesheet

const TaskView = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://taskmanager-ahlh.onrender.com/home/fetchData");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleDel = async (id) => {
    try {
      await axios.delete(`https://taskmanager-ahlh.onrender.com/home/delete/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="container">
      <div className="nav-buttons">
        <button onClick={() => navigate("/addTask")}>Add Task</button>
        <button onClick={() => navigate("/viewTask")}>View Task</button>
      </div>

      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <div>
                <strong>{task.title}</strong>
                <span>{task.description}</span>
              </div>
              <div className="task-buttons">
                <button className="delete" onClick={() => handleDel(task._id)}>Delete</button>
                <button className="edit" onClick={() => handleEdit(task._id)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default TaskView;
