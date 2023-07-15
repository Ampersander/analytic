const nodemailer = require('nodemailer');
const Transport = require("nodemailer-sendinblue-transport");

// Méthode pour envoyer un e-mail
exports.sendEmail = async (emailOptions) => {
  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport(
    new Transport({ apiKey: process.env.SENDINBLUE_API_KEY })
  );

  try {
    // Envoyer l'e-mail
    await transporter.sendMail(emailOptions);
    console.log('L\'e-mail a été envoyé avec succès');
  } catch (error) {
    console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw new Error('Erreur lors de l\'envoi de l\'e-mail');
  }
};