const nodemailer = require('nodemailer');

// Configuration du serveur SMTP
const smtpConfig = {
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'cb4f1cc59099d9',
    pass: 'a62cf345361dba',
  },
  tls: {
    ciphers: 'SSLv3',
  },
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