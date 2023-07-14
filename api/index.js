const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

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

// Importer le fichier de configuration de la base de données
const database = require('./utils/database');

// Connexion à la base de données MongoDB
database.connectDB();