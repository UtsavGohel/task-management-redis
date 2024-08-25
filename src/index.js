const express = require("express");
const http = require("http");
const cors = require("cors");
const { connectMongo } = require("./config/DB");
const { connectRedis } = require("./config/redis");
const {
  listTasks,
  addTask,
  completeTask,
  removeTask,
} = require("./services/taskService");
const setupWebSocket = require("./sockets/websocket");
const app = express();
const port = 3000;

// Connect to MongoDB and Redis
connectMongo();
connectRedis();

// Middleware
app.use(cors());
app.use(express.json());

// Define API routes
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  try {
    const task = await addTask(title);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await listTasks();

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/tasks/:id/complete", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await completeTask(id);
    res.json(task);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await removeTask(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Start server and WebSocket
const server = http.createServer(app);
setupWebSocket(server);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
