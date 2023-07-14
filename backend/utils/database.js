const mongoose = require('mongoose');

// Configuration de la connexion à la base de données MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connexion à la base de données MongoDB établie avec succès !');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données MongoDB :', error);
        process.exit(1); // Arrêter le processus en cas d'erreur de connexion
    }
};

module.exports = { connectDB };
