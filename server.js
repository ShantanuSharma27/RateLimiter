const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
const taskRoutes = require('./routes/task');

// MongoDB connection
mongoose.connect('mongodb+srv://shansharma2707:buddy123@cluster0.ytot1mv.mongodb.net/Fintech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use('/api/v1', taskRoutes);

// Ensure log directory exists
fs.ensureDirSync(path.join(__dirname, 'logs'));

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
