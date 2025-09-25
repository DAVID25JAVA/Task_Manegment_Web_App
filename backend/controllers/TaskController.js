import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, dueDate, completed } = req.body;
    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }
    const task = new Task({
      title: title.trim(),
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: !!completed,
    });
    await task.save();
    res.status(201).json({ success: true, message:"Task Added", task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, dueDate, completed } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (dueDate !== undefined)
      updates.dueDate = dueDate ? new Date(dueDate) : null;
    if (completed !== undefined) updates.completed = completed;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, task, message:"Task Updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
