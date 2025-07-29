const jwt = require('jsonwebtoken');

const createToken = ({ name, id: userId }) => {
  const payload = { userId, name };
  const token = jwt.sign(payload, 'secret-code', { expiresIn: '1h' });
  // console.log('Inside createToken:', token);
  return token;
};


const compareToken = (req, res, next) => {
  let token = null;

  // Prefer cookie token first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // Then check Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token found
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret-code');
    req.user = payload; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { createToken, compareToken };
