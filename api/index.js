const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config();

// Middleware pour autoriser les requêtes cross-origin
app.use(cors())

// Middleware pour parser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Middleware pour les routes des visiteurs
const visitorsRoutes = require('./routes/visitorsRoutes');
app.use('/api/visitors', visitorsRoutes);

// Middleware pour les routes des événements
const eventsRoutes = require('./routes/eventsRoutes');
app.use('/api/events', eventsRoutes);

// Middleware pour les routes des erreurs
const errorsRoutes = require('./routes/errorsRoutes');
app.use('/api/errors', errorsRoutes);

// Middleware pour les routes des tags
const tagsRoutes = require('./routes/tagsRoutes');
app.use('/api/tags', tagsRoutes);

// Midleware pour les routes des utilisateurs
const usersRoutes = require('./routes/usersRoutes');
app.use('/api/users', usersRoutes);

// Importer le fichier de configuration de la base de données
const database = require('./utils/database');

// Connexion à la base de données MongoDB
database.connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});