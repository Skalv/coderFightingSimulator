const Player = require('./models/player');
const Team   = require('./models/team');
const Item   = require('./models/item');
const Fight  = require('./models/fight');

// Création des Joueurs
var joueur1 = new Player('Florent', "fboutin76@gmail.com", "tutu");
var joueur2 = new Player('Albert', 'albert2000&gmail.com', "titi");

// Création d'une team
var team1 = new Team('webforce');

// Création d'équipements
var item1 = new Item('bottes', 'Bottes en cuir d\'ascalon', 10, 30, 'Bottes en cuir de Charr', 50);
var item2 = new Item('torse', 'Bottes en cuir d\'ascalon', 30, 100, 'Bottes en cuir de Charr', 50);


// Ajout du joueur à la team.
team1.addPlayer(joueur1);

// Ajout d'un nouveau personnage à la collection de joueur1
var monPerso = joueur1.createCharactere('Skalv', "fullstack Dev", "Barbu");
var persoAlbert = joueur2.createCharactere('Bebert', "chercheur", "Random");


// Ajout de nos bottes à notre personnage
// monPerso.equip(item1);
// persoAlbert.equip(item2);

// Combat entre le joueur1 et le joueur2
var fight1 = new Fight(monPerso, persoAlbert, "kind");
fight1.prepareToFight();
