const jwt = require('jsonwebtoken');

const createToken = ({ name, id: userId }) => {
  const payload = { userId, name };
  const token = jwt.sign(payload, 'secret-code', { expiresIn: '1h' });
  // console.log('Inside createToken:', token);
  return token;
};

const compareToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, 'secret-code');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { createToken, compareToken };
