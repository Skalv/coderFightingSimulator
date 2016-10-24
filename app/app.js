const Player = require('./models/player');
const Team   = require('./models/team');
const Item   = require('./models/item');
const Fight  = require('./models/fight');
const Arena  = require('./models/arena');

// Création du Joueur

var joueur1 = new Player('Florent', "fboutin76@gmail.com", "tutu");
var joueur2 = new Player('Albert', "albert12@gmail.com", "ttiti");

// Création d'une team
var team1 = new Team('webforce');
// Création d'équipements
var item1 = new Item('bottes', 'Bottes en cuir d\'ascalon', 10, 30, 'Bottes en cuir de Charr', 50);
// Création d'une arene
var arena = new Arena('kind');

//Ajout du joueur à la team.
team1.addPlayer(joueur1);

// Ajout d'un nouveau personnage à la collection de joueur1
var monPerso = joueur1.createCharactere('Skalv', "fullstack Dev", "Barbu");
var albertPerso = joueur2.createCharactere('Bebert', "chomeur", "");

// Ajout de nos bottes à notre personnage
//
monPerso.equip(item1);

// Combat entre monPerso et Bebert !
var fight1 = new Fight(monPerso, albertPerso, arena);
fight1.prepareToFight();
