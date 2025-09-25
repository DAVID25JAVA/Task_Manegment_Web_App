import { useState, useEffect } from "react";
import { CheckCircle, Trash2, Plus, Edit2, ListTodo, Search, Check } from "lucide-react";
import toast from "react-hot-toast";
import API from "@/services/Api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 search state

  const fetchTasks = async () => {
    try {
      const data = await API("get", "task/get-tasks");
      setTasks(data?.tasks || []);
    } catch (error) {
      toast.error(error?.message);
      console.error("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const task = await API("post", "task/create-tasks", {
        title: newTask,
        completed: false,
      });
      setTasks([...tasks, task]);
      toast.success(task?.message);
      await fetchTasks();
      setNewTask("");
    } catch (error) {
      toast?.error(error?.message)
      console.error("Error adding task:", error.message);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const updated = await API("put", `task/update-tasks/${id}`, {
        completed: !completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Error toggling task:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await API("delete", `task/delete-tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
      toast.success(res?.message);
      await fetchTasks();
    } catch (error) {
      toast.error(error?.message)
      console.error("Error deleting task:", error.message);
    }
  };

  const startEdit = (id, title) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const updated = await API("put", `task/update-tasks/${id}`, { title: editText });
      console.log("update--->", updated);
      
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
      toast.success(updated?.message)
      await fetchTasks()
      setEditingId(null);
      setEditText("");
    } catch (error) {
      toast.error(error?.message)
      console.error("Error editing task:", error.message);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  // 🔹 Filter tasks by search
  const filteredTasks = tasks.filter((t) =>
    t.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ListTodo className="w-6 h-6 text-orange-500" />
            My Tasks
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {completedCount}/{totalCount} tasks completed
          </p>
        </div>
      </div>

      {/* 🔹 Search Input */}
      <div className="flex items-center gap-2 mb-4 p-3 border rounded-lg bg-gray-50">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* Add Task Input */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-100">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task ..."
          className="flex-1 bg-white text-black border-0 outline-none px-4 py-3 rounded-lg placeholder:text-black focus:ring-2 focus:ring-orange-500 transition"
        />
        <button
          onClick={addTask}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <ListTodo className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">
            No tasks found. Try searching or add a new one!
          </p>
        </div>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group ${
                task.completed
                  ? "bg-green-50 border-green-200 hover:bg-green-100"
                  : "bg-gray-50 border-gray-200 hover:bg-pink-50 hover:border-pink-200"
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Toggle */}
                <button
                  onClick={() => toggleComplete(task.id, task.completed)}
                  className={`p-2 rounded-lg transition-colors ${
                    task.completed
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-white border-2 border-gray-300 hover:border-orange-500 text-gray-500 hover:text-orange-500"
                  }`}
                >
                  <CheckCircle
                    className={`w-5 h-5 ${task.completed ? "fill-current" : ""}`}
                  />
                </button>

                {/* Title */}
                {editingId === task._id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                    onBlur={() => saveEdit(task._id)}
                    className="flex-1 bg-white px-3 py-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    autoFocus
                  />
                ) : (
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block font-medium pr-2 truncate ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {editingId === task._id ? (
                  <button
                    onClick={() => saveEdit(task._id)}
                    className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                    title="Save task"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(task._id, task.title)}
                    className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition"
                    title="Edit task"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
