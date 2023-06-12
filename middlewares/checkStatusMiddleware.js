require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (status) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "User isn't logged in" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.status !== status) {
      return res.status(403).json({ message: "User doesn't have access" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "User isn't logged in" });
  }
};
