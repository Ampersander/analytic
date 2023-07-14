const jwtSecret = process.env.JWT_SECRET; // Clé d'API pour l'authentification JWT
const jwt = require('jsonwebtoken');

// Middleware d'authentification JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;