const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'queued' }
});

module.exports = mongoose.model('Task', taskSchema);
