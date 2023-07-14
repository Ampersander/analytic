# Projet WEB Analytics SDK

## Architecture
- `sdk/`: Cœur de notre SDK tracker
- `api/`: API protégée par JWT utilisée par notre SDK ou notre app tout comme nos clients finaux
- `app/`: Backoffice de notre solution
-`vue-todo-app/`: Application d'example qui utilise notre SDK

## Installation
1. Faire un `<npm|yarn|pnpm> install` dans chaque répertoire.
2. Dans `api/`, renommer le fichier `.env.sample` dans `.env`.
3. Dans ce fichier `.env`, s'assurer que la base de données soit bien configurée.