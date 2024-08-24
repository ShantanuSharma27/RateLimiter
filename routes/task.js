const express = require('express');
const router = express.Router();
const { handleTask } = require('../controllers/taskController');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/task', rateLimiter, handleTask);

module.exports = router;
