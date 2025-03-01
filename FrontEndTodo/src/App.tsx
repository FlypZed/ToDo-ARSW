import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    await createTask({ title: newTask, completed: false });
    setNewTask("");
    fetchTasks();
  };

  const handleToggleTask = async (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await updateTask(id, { completed: !tasks.find((task) => task.id === id)?.completed });
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={handleAddTask}>Agregar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
            <button onClick={() => handleToggleTask(task.id)}>
              {task.completed ? "Desmarcar" : "Completar"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
