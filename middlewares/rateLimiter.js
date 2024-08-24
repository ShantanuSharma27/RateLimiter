const RateLimit = require('../models/RateLimit');

async function rateLimiter(req, res, next) {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'user_id is required.' });
  }

  const currentTime = Date.now();
  const minuteAgo = new Date(currentTime - 60000);

  let rateLimit = await RateLimit.findOne({ user_id });

  if (!rateLimit) {
    rateLimit = new RateLimit({ user_id });
  }

  if (rateLimit.lastTime < minuteAgo) {
    rateLimit.count = 0; // Reset the count if more than a minute has passed
    rateLimit.lastTime = currentTime;
  }

  if (rateLimit.count < 20) {
    rateLimit.count++;
    rateLimit.lastTime = currentTime;
    await rateLimit.save();
    return next(); // Allow the request
  } else {
    return res.status(429).json({ message: 'Rate limit exceeded.' });
  }
}

module.exports = rateLimiter;
