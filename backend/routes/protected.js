const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/profile', auth, (req, res) => {
  res.json({ message: `Hello, user with ID: ${req.user.id}`, user: req.user });
});

module.exports = router;
