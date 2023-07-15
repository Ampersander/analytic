const User = require('../models/userModel');

const authenticateApp = (req, res, next) => {
  const { appId, appSecret } = req.headers;

  if (!appId || !appSecret) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  // Vérifier l'APP_ID et l'APP_SECRET
  User.findOne({ appId, appSecret }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }

    // Stocker les informations d'authentification dans la demande
    req.userId = user._id;
    req.authType = 'app';

    next();
  });
};

module.exports = authenticateApp;
