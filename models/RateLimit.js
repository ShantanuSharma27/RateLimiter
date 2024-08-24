const mongoose = require('mongoose');

const rateLimitSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  lastTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RateLimit', rateLimitSchema);
