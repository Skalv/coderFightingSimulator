const Player = require('./models/Player');

// Création du Joueur
var joueur1 = new Player('Florent', "fboutin76@gmail.com", "tutu");

// Ajout d'un nouveau personnage à la collection de joueur1
joueur1.createCharactere('Skalv', "fullstack Dev", "Barbu");

console.log(jouseur1.getCharactere('Skalv'));
