import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FILTERS = {
  all: (task) => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks on load
  useEffect(() => {
    setLoading(true);
    fetch("https://todo-backend-jg0e.onrender.com/tasks")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      setLoading(true);
      const res = await fetch("https://todo-backend-jg0e.onrender.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const task = await res.json();
      setTasks([...tasks, task]);
      setNewTask("");
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await fetch(`https://todo-backend-jg0e.onrender.com/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  // Toggle complete (now with explicit completed value)
  const toggleTask = async (id, completed) => {
    try {
      setLoading(true);
      const res = await fetch(`https://todo-backend-jg0e.onrender.com/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated = await res.json();
      setTasks(tasks.map((task) => (task.id === id ? updated : task)));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit task
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };
  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return;
    try {
      setLoading(true);
      const res = await fetch(`https://todo-backend-jg0e.onrender.com/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingTitle }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated = await res.json();
      setTasks(tasks.map((task) => (task.id === id ? updated : task)));
      setEditingId(null);
      setEditingTitle("");
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(FILTERS[filter]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border  bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
      <form onSubmit={addTask} className="flex mb-4">
        <input
          className="flex-1 border p-2 focus:outline-none"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          aria-label="Add a new task"
          disabled={loading}
        />
        <button
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 transition"
          type="submit"
          disabled={loading}
        >
          Add
        </button>
      </form>
      <div className="flex justify-between mb-4">
        {Object.keys(FILTERS).map((f) => (
          <button
            key={f}
            className={`px-2 py-1 text-sm font-medium transition ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilter(f)}
            disabled={loading}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {loading && <div className="text-center text-blue-500 mb-2">Loading...</div>}
      {error && <div className="text-center text-red-500 mb-2">{error}</div>}
      {!loading && filteredTasks.length === 0 && (
        <div className="text-center text-gray-400 mb-2">No tasks found.</div>
      )}
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between mb-2 p-2 border group bg-gray-50 hover:bg-gray-100 transition"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id, !task.completed)}
              className="mr-3 accent-blue-500 cursor-pointer"
              aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              disabled={loading}
              title={task.completed ? "Mark as incomplete" : "Mark as complete"}
            />
            {editingId === task.id ? (
              <>
                <input
                  className="flex-1 border p-1 mr-2"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(task.id);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  autoFocus
                />
                <button
                  className="text-green-600 font-bold mr-1"
                  onClick={() => saveEdit(task.id)}
                  aria-label="Save"
                  disabled={loading}
                >
                  ✓
                </button>
                <button
                  className="text-gray-500 font-bold"
                  onClick={cancelEdit}
                  aria-label="Cancel"
                  disabled={loading}
                >
                  ×
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => startEdit(task)}
                  className={`flex-1 cursor-pointer select-none transition ${
                    task.completed ? "line-through text-gray-400" : "hover:text-blue-600"
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-label="Edit task"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") startEdit(task);
                  }}
                  title="Edit task"
                >
                  {task.title}
                </span>
                <button
                  className={`ml-2 px-2 py-1 text-xs font-semibold transition ${task.completed ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                  onClick={() => toggleTask(task.id, !task.completed)}
                  aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                  disabled={loading}
                  title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
                <button
                  className="ml-2 text-gray-400 hover:text-blue-500 transition"
                  onClick={() => startEdit(task)}
                  aria-label="Edit"
                  disabled={loading}
                >
                  ✎
                </button>
                <button
                  className="ml-2 text-red-400 hover:text-red-600 transition"
                  onClick={() => confirmDelete(task.id)}
                  aria-label="Delete"
                  disabled={loading}
                >
                  🗑
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;