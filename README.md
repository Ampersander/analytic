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
2. Dans `api/` et `app/`, renommer les fichiers `.env.sample` en `.env`.
3. Dans ces fichiers `.env`, s'assurer que la base de données, les ports et l'URL de l'API sont corrects.
4. Toujours dans ces deux dossiers, faire un `npm start` ou lancer la tâche "Start Project" grâce à la palette de commande de VSCode.

## Note
- Le dossier `vue-todo-app/` est une application d'example qui utilise notre SDK.
