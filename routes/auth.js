const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

// Load from process.env
const { ADMIN_USER, ADMIN_PASS, JWT_SECRET } = process.env;

// POST /api/login
router.post('/', (req, res) => {
  const { user, pass } = req.body;
    console.log('incoming body:', req.body);
  console.log('ENV creds:', ADMIN_USER, ADMIN_PASS);
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    console.log("user", user, "password", pass)
    // Issue a token valid for 2h
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;
