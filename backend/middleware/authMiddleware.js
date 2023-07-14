const apiKey = process.env.SDK_API_KEY; // Clé d'API pour l'authentification

// Middleware d'authentification
const authenticate = (req, res, next) => {
  const providedKey = req.headers['x-api-key'];

  if (!providedKey || providedKey !== apiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
};

module.exports = authenticate;