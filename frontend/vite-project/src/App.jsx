import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css';
import TaskAdd from "./components/TaskAdd";
import TaskView from "./components/TaskView";
import Update from "./components/Update";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/addTask" element={<TaskAdd />} />
        <Route path="/viewTask" element={<TaskView />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>

  )
}

export default App
