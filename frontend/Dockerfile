# Utiliser l'image de base Node.js
FROM node:16-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 8007
EXPOSE 8007

# Démarrer l'application
CMD ["npm", "start"]