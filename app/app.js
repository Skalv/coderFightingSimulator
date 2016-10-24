const Player = require('./models/player');
const Team   = require('./models/team');
const Item   = require('./models/item');

// Création du Joueur
var joueur1 = new Player('Florent', "fboutin76@gmail.com", "tutu");
// Création d'une team
var team1 = new Team('webforce');
// Création d'équipements
var item1 = new Item('bottes', 'Bottes en cuir d\'ascalon', 10, 30, 'Bottes en cuir de Charr', 50);

//Ajout du joueur à la team.
team1.addPlayer(joueur1);

// Ajout d'un nouveau personnage à la collection de joueur1
var monPerso = joueur1.createCharactere('Skalv', "fullstack Dev", "Barbu");

// Ajout de nos bottes à notre personnage
monPerso.equip(item1);
// Retirer les bottes du perso
