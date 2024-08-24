const Task = require('../models/Task');

function processQueue() {
  Task.findOneAndUpdate({ status: 'queued' }, { status: 'processing' })
    .then(task => {
      if (task) {
        // Perform the task
        task.status = 'completed';
        task.save();
      }
    })
    .catch(err => console.log(err));
}

function addTask(taskId, task) {
  processQueue();
  task(); // Execute the task
}

// Process tasks every second
setInterval(processQueue, 1000);

module.exports = { addTask };
