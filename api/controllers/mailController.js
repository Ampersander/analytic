const mailer = require('../utils/mailer');

// Méthode pour envoyer un e-mail de confirmation
exports.sendConfirmationEmail = (req, res, email, token) => {

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Confirmation d\'inscription',
    text: `Cliquez sur le lien suivant pour confirmer votre inscription : http://localhost:3000/confirm/${token}`,
  };

  mailer.sendEmail(mailOptions)
    .then(() => {
      res.status(200).json({ message: 'E-mail de confirmation envoyé avec succès' });
    })
    .catch((error) => {
      console.log('Erreur lors de l\'envoi de l\'e-mail de confirmation :', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail de confirmation' });
    });
};

// Méthode pour envoyer un e-mail de réinitialisation de mot de passe
exports.sendPasswordResetEmail = (email, resetToken) => {

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Réinitialisation de mot de passe',
    text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : http://localhost:3000/reset-password/${resetToken}`,
  };

  mailer.sendMail(mailOptions, (error) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail de réinitialisation de mot de passe :', error);
    }
  });
};

// Méthode pour envoyer un e-mail de confirmation et d'informations
exports.sendConfirmationAndAppInfoEmail = (email, appid, appsecret) => {

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Confirmation et informations de l\'application',
    text: `Votre compte a été confirmé. Veuillez trouver ci-dessous les informations de l'application :
      APP_ID : ${appid}
      APP_SECRET : ${appsecret}
      Utilisez ces informations pour accéder à l'application.`,
  };

  mailer.sendMail(mailOptions, (error) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail de confirmation et d\'informations :', error);
    }
  });
};
