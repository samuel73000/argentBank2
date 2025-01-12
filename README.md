# Argent Bank

## Description
Argent Bank est une application React avec une API Express qui permet aux utilisateurs de gérer leurs comptes bancaires. Ce projet inclut une interface front-end développée en React et un back-end Express connecté à une base de données MongoDB.

## Prérequis
Assurez-vous d'avoir les outils suivants installés sur votre machine :
- [Node.js](https://nodejs.org/) (version 14 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (inclus avec Node.js)


## Installation
1. **Clonez le dépôt du projet** :  
`git clone <url-du-repo>`  
`cd <nom-du-repo>`  
2. **Installez les dépendances** :  
- Pour le front-end :  
`cd front && npm install`  
- Pour le back-end :  
`cd back && npm install`  

## Démarrage du Projet

### Front-end
1. Accédez au dossier `front` : `cd front`  
2. Lancez le serveur de développement : `npm start`  

### Back-end
1. Accédez au dossier `back` : `cd back`  
2. Remplissez la base de données avec les données initiales : `npm run populate-db`  
3. Lancez le serveur back-end : `npm run dev:server`  

## Technologies utilisées
### Front-end : React, Redux Toolkit, React Router DOM, FontAwesome, Axios  
### Back-end : Express, MongoDB avec Mongoose, bcrypt, JSON Web Tokens, Swagger  

## Scripts utiles

### Front-end :  
- **Démarrer l'application** : `npm start`  
- **Compiler pour la production** : `npm run build`  
- **Lancer les tests** : `npm test`  

### Back-end :  
- **Démarrer le serveur en mode développement** : `npm run dev:server`  
- **Initialiser la base de données** : `npm run populate-db`  
- **Démarrer le serveur en mode production** : `npm run server`  

## Contribution
1. Forkez ce dépôt.  
2. Créez une branche pour votre fonctionnalité : `git checkout -b feature/NouvelleFonctionnalite`  
3. Commitez vos modifications : `git commit -m 'Ajout d’une nouvelle fonctionnalité'`  
4. Poussez la branche : `git push origin feature/NouvelleFonctionnalite`  
5. Ouvrez une Pull Request.  

## Licence
Ce projet est sous licence libre. Consultez le fichier LICENSE pour plus d'informations.
