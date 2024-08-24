const path = require('path');
const fs = require('fs-extra');
const Task = require('../models/Task');
const taskQueue = require('../queue/taskQueue');

async function task(user_id) {
  const logMessage = `${user_id} - task completed at - ${new Date().toISOString()}\n`;
  console.log(logMessage);
  await fs.appendFile(path.join(__dirname, '../logs/task_log.txt'), logMessage);
}

async function handleTask(req, res) {
  const { user_id } = req.body;

  // Create a task and add it to the queue
  const newTask = new Task({ user_id });
  await newTask.save();
  taskQueue.addTask(newTask._id, () => task(user_id));

  res.status(202).json({ message: 'Task has been queued for processing.' });
}

module.exports = { handleTask };
