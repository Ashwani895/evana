const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now available in your next route
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};
