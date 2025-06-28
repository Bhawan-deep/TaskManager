import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Update.css"; // 🔥 Import the CSS

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [temptitle, settempTitle] = useState("");
  const [tempdescription, settempDescription] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleChange = (e) => setTitle(e.target.value);
  const descChange = (e) => setDescription(e.target.value);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://taskmanager-ahlh.onrender.com/home/UpdateTask/${id}`);
      settempTitle(res.data.title);
      settempDescription(res.data.description);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const update = async () => {
    try {
      await axios.put(`https://taskmanager-ahlh.onrender.com/home/UpdateTask/${id}`, {
        title,
        description,
      });
      navigate("/viewTask");
    } catch (error) {
      alert("Error updating task");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Update Task</h2>
      <input
        type="text"
        placeholder={temptitle}
        value={title}
        onChange={titleChange}
      />
      <input
        type="text"
        placeholder={tempdescription}
        value={description}
        onChange={descChange}
      />
      <button onClick={update}>Update</button>
    </div>
  );
}

export default Update;
