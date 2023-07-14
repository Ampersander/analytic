const nodemailer = require('nodemailer');

// Configuration du serveur SMTP
const smtpConfig = {
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: process.env.MAILER_SECURE,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  },
  tls: {
    ciphers: 'SSLv3'
  }
};

// Méthode pour envoyer un e-mail
exports.sendEmail = async (emailOptions) => {
  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport(smtpConfig);

  try {
    // Envoyer l'e-mail
    await transporter.sendMail(emailOptions);
    console.log('L\'e-mail a été envoyé avec succès');
  } catch (error) {
    console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw new Error('Erreur lors de l\'envoi de l\'e-mail');
  }
};