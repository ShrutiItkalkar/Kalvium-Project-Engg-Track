import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Add task
  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Remaining tasks count
  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Task Manager</h1>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
        style={{ width: "70%", padding: "8px" }}
      />

      <button onClick={addTask} style={{ padding: "8px", marginLeft: "5px" }}>
        Add
      </button>

      {/* Filters */}
      <div style={{ marginTop: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Task List */}
      <ul style={{ marginTop: "15px", listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              padding: "5px 0",
            }}
          >
            {task.title}
          </li>
        ))}
      </ul>

      {/* Task Count */}
      <p>{remainingTasks} tasks remaining</p>
    </div>
  );
}

export default App;