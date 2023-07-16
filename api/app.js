const express = require('express'),
	app = express(),
	cors = require('cors'),
	path = require('path'),
	helmet = require('helmet'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	compression = require('compression'),
	createError = require('http-errors'),
	cookieParser = require('cookie-parser'),
	swaggerJsdoc = require('swagger-jsdoc'),
	swaggerUi = require('swagger-ui-express')

require('dotenv').config()

// Middleware pour autoriser les requêtes cross-origin
app.use(cors())

// Middleware pour parser le corps des requêtes au format JSON
app.use(bodyParser.json())

// Autres middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(compression()) // Compress all routes

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')))

// Middleware pour la documentation de l'API avec Swagger
const options = {
	definition: {
		openapi: '3.1.0',
		info: {
			title: 'Analytic API with Swagger',
			version: '1.0.0',
			description: 'This is a REST API application made with Express and documented with Swagger',
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html'
			},
			contact: {
				name: 'Swagger',
				url: 'https://swagger.io',
				email: 'info@smartbear.com'
			}
		},
		servers: [
			{
				url: 'http://localhost:' + process.env.PORT + '/api'
			}
		]
	},
	apis: ['./routes/*.js']
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

// Middleware pour les routes des visiteurs
const visitorsRoutes = require('./routes/visitorsRoutes')
app.use('/api/visitors', visitorsRoutes)

// Middleware pour les routes des événements
const eventsRoutes = require('./routes/eventsRoutes')
app.use('/api/events', eventsRoutes)

// Middleware pour les routes des erreurs
const errorsRoutes = require('./routes/errorsRoutes')
app.use('/api/errors', errorsRoutes)

// Middleware pour les routes des tags
const tagsRoutes = require('./routes/tagsRoutes')
app.use('/api/tags', tagsRoutes)

// Middleware pour les routes des tunnels
const tunnelsRoutes = require('./routes/tunnelsRoutes')
app.use('/api/tunnels', tunnelsRoutes)

// Midleware pour les routes des utilisateurs
const usersRoutes = require('./routes/usersRoutes')
app.use('/api/users', usersRoutes)

// Gestion des erreurs
app.use(function (req, res, next) { next(createError(404)) })

/* app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
}) */

// Importer le fichier de configuration de la base de données
const database = require('./utils/database')

// Connexion à la base de données MongoDB
database.connectDB().then(() => {
	// Insérer l'admin au démarrage de l'app
	const User = require('./models/userModel');

	const admin = new User({
		name: "Admin",
		email: "admin@admin.fr",
		password: "admin",
		isAdmin: true,
		confirmed: true,
		address: "1 rue de l'admin",
		companyName: "Admin Company",
		corsApp: "http://admin.com"
	});

	User.findOne({ email: admin.email })
		.then(existingData => {
			if (existingData) {
				console.log('L\'admin existent déjà, insertion ignorée');
				return;
			}

			return User.insertMany(admin);
			console.log('Admin insérées avec succès');
		})
		.then(() => {
		})
		.catch(error => {
			console.error('Erreur lors de la recherche ou de l\'insertion des données :', error);
		});
}).catch((error) => {
	console.error('Erreur lors de la connexion à la base de données :', error);
});

module.exports = app