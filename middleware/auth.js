const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = function (req, res, next) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(auth, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
