// seed.js

const User = require('./models/userModel');

const seedData = [
    {
        "name": "Admin",
        "email": "admin@admin.fr",
        "password": "admin",
        "isAdmin": true,
        "confirmed": true,
        "adress": "1 rue de l'admin",
        "companyName": "Admin Company",
        "corsApp": "http://admin.com"
    }
];

User.findOne({})
    .then(existingData => {
        if (existingData) {
            console.log('Les données existent déjà, insertion ignorée');
            process.exit(0);
        }

        return User.insertMany(seedData);
    })
    .then(() => {
        console.log('Données insérées avec succès');
        process.exit(0);
    })
    .catch(error => {
        console.error('Erreur lors de la recherche ou de l\'insertion des données :', error);
        process.exit(1);
    });