const WebSocket = require("ws");
const {
  addTask,
  completeTask,
  removeTask,
  listTasks,
} = require("../services/taskService");

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket connection established");

    ws.on("message", async (message) => {
      const data = JSON.parse(message);
      let result;

      switch (data.action) {
        case "add":
          result = await addTask(data.title);
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "added", task: result }));
            }
          });
          break;
        case "complete":
          result = await completeTask(data.id);
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "updated", task: result }));
            }
          });
          break;
        case "delete":
          await removeTask(data.id);
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "deleted", id: data.id }));
            }
          });
          break;
      }
    });

    // Send initial task list
    listTasks().then((tasks) => {
      ws.send(JSON.stringify({ type: "initial", tasks }));
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });
}

module.exports = setupWebSocket;
