const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const filePath = "./tasks.json";

// Helper function to read/write tasks
const getTasks = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const saveTasks = (tasks) =>
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

// Initialize file if not present
if (!fs.existsSync(filePath)) saveTasks([]);

// Create a Task
router.post("/", (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const tasks = getTasks();
    const newTask = { id: uuidv4(), title, description, status: "pending" };
    tasks.push(newTask);
    saveTasks(tasks);

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (e) {
    console.log("An error occurred in the task creation process:", e);
    return res
      .status(500)
      .json({ error: "Something went wrong.Please try again latter." });
  }
});

// Get All Tasks
router.get("/", (req, res) => {
  try {
    const tasks = getTasks();
    res.status(200).json(tasks);
  } catch (e) {
    console.log("An error occurred in the task retrieval process:", e);
    return res
      .status(500)
      .json({ error: "Something went wrong.Please try again latter." });
  }
});

// Update a Task
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !["pending", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const tasks = getTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = status;
    saveTasks(tasks);

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (e) {
    console.log("An error occurred in the task update process:", e);
    return res
      .status(500)
      .json({ error: "Something went wrong.Please try again latter." });
  }
});

// Delete a Task
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const tasks = getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1)
      return res.status(404).json({ error: "Task not found" });

    tasks.splice(taskIndex, 1);
    saveTasks(tasks);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    console.log("An error occurred in the task delete process:", e);
    return res
      .status(500)
      .json({ error: "Something went wrong.Please try again latter." });
  }
});

// Filter Tasks by Status
router.get("/status/:status", (req, res) => {
  try {
    const { status } = req.params;
    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const tasks = getTasks();
    const filteredTasks = tasks.filter((t) => t.status === status);
    res.status(200).json(filteredTasks);
  } catch (e) {
    console.log(
      "An error occurred in the task retrieval by status process:",
      e
    );
    return res
      .status(500)
      .json({ error: "Something went wrong.Please try again latter." });
  }
});

module.exports = router;
