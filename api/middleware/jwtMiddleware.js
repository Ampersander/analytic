const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Stocker les informations d'authentification dans la demande
    req.userId = decoded.userId;
    req.authType = 'jwt';

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }
};

module.exports = authenticateJWT;