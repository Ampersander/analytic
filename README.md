# Projet WEB Analytics SDK
## Contributeurs
- [BAERT Romain](https://github.com/Ampersander)
- [DE MADET Michael](https://github.com/michael2509)
- [MILLOT Nils](https://github.com/NilsMillot)
- [MONDESIR Malik](https://github.com/mondesirm)
- [PERRADIN Nicolas](https://github.com/nicolasperradin)

## Architecture
- `sdk/`: Cœur de notre SDK tracker
- `api/`: API protégée par JWT utilisée par notre SDK ou notre app tout comme nos clients finaux
- `app/`: Backoffice de notre solution
- `vue-todo-app/`: Application d'example qui utilise notre SDK

## Installation
1. Faire un `<npm|yarn|pnpm> install` dans chaque répertoire.
2. Dans `api/`, renommer le fichier `.env.sample` dans `.env`.
3. Dans ce fichier `.env`, s'assurer que la base de données soit bien configurée.
4. Faire un `npm start` dans `api/` puis dans `app/` ou lancer la tâche "Start Project" dans la palette de commande de VSCode.

## Note
- Le dossier `vue-todo-app/` est une application d'example qui utilise notre SDK.
