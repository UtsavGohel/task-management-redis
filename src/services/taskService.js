const { client: mongoClient } = require("../config/DB");
const { redisClient } = require("../config/redis");

const db = mongoClient.db("taskmanager");
const tasksCollection = db.collection("tasks");

async function addTask(title) {
  const task = { title, completed: false };
  const result = await tasksCollection.insertOne(task);
  await redisClient.set(result.insertedId.toString(), JSON.stringify(task));
  return { _id: result.insertedId.toString(), ...task };
}

async function completeTask(id) {
  const task = await tasksCollection.findOne({ _id: id });
  if (!task) throw new Error("Task not found");

  task.completed = true;
  await tasksCollection.updateOne({ _id: id }, { $set: { completed: true } });
  await redisClient.set(id, JSON.stringify(task));
  return task;
}

async function removeTask(id) {
  await tasksCollection.deleteOne({ _id: id });
  await redisClient.del(id);
}

async function listTasks() {
  const tasks = await tasksCollection.find().toArray();
  return tasks;
}

module.exports = { addTask, completeTask, removeTask, listTasks };
