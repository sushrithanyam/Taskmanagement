import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [status, setStatus] = useState("PENDING");
  const [assignedTo, setAssignedTo] = useState("");

  // Load tasks from backend
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    axios.get("http://localhost:8080/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  };

  // Add Task
  const addTask = () => {
    axios.post("http://localhost:8080/tasks", {
      id: Math.floor(Math.random() * 10000),
      title,
      priority,
      status,
      assignedTo
    }).then(() => {
      loadTasks();
      clearForm();
    });
  };

  // Delete Task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => loadTasks());
  };

  // Clear form
  const clearForm = () => {
    setTitle("");
    setPriority("LOW");
    setStatus("PENDING");
    setAssignedTo("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management Dashboard</h1>

      {/* ADD TASK FORM */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Add Task</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>PENDING</option>
          <option>IN_PROGRESS</option>
          <option>COMPLETED</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      {/* TASK TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{task.assignedTo}</td>
              <td>
                <button onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;