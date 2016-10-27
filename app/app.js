const Player = require('./models/player');
const Team   = require('./models/team');
const Item   = require('./models/item');
const Fight  = require('./models/fight');
const Arena  = require('./models/arena');

// Création des variables globales.
var joueur1;
// Générateur d'items.
var items = [];
var nameP1 = ["de force", 'de robustesse', 'de rapidité'];
var itemType = ["bottes", "pantalon", "torse", "gants", "casque", "main gauche", "main droite", "power"];
var statsSet = [
  [[20, 10, 30], [10, 20, 30], [10, 10, 60]], // bottes
  [[30, 10, 10], [10, 30, 10], [20, 20, 20]], // pantalon
  [[50, 30, 5], [30, 50, 5], [40, 40, 40]], // torse
  [[15, 5, 5], [5, 15, 5], [10, 10, 15]], // gants
  [[30, 20, 10], [20, 30, 10], [25, 25, 25]], // head
  [[50, 10, 10], [10, 50, 50], [25, 25, 25]], // mh
  [[40, 10, 10], [10, 40, 50], [25, 25, 25]], // oh
  [[100, 0, 0], [0, 100, 0], [0, 0, 100]], // power
]
for (var i = 0; i < itemType.length; i++) {
  for (var j = 0; j < nameP1.length; j++) {
    var itemName = itemType[i] + " " + nameP1[j];
    // type, name, atk, def, desc, spd
    var item = new Item(itemType[i], itemName, statsSet[i][j][0], statsSet[i][j][1], itemName, statsSet[i][j][2]);
    items.push(item);
  }
}

$('.formPlayer').on('submit', function(e) {
  // Stop l'envois du formulaire vers le serveur.
  e.preventDefault();
  // Récup des datas.
  var datas = $(this).serializeArray();
  // Formate les données dans un objet JS.
  var formatdata = {};
  for (var i = 0; i < datas.length; i++) {
    formatdata[datas[i].name] = datas[i].value;
  }
  // Création du Player.
  joueur1 = new Player(formatdata.username, formatdata.email, formatdata.password);
  // Cacher le formulaire
  $('.formPlayer').addClass('hide');
  // Ajout du nom du joueur dans le titre de la page.
  $('.pageTitle').text("Salut " + formatdata.username);
  // Afficher le formulaire de création de personnage.
  $('.formCharactere').removeClass('hide');
})

$('.formCharactere').on('submit', function(e) {
  // Stop l'envois du formulaire vers le serveur.
  e.preventDefault();
  // Récup des datas.
  var datas = $(this).serializeArray();
  // Formate les données dans un objet JS.
  var formatdata = {};
  for (var i = 0; i < datas.length; i++) {
    formatdata[datas[i].name] = datas[i].value;
  }
  // Création du personnage.
  joueur1.createCharactere(formatdata.name, formatdata.classe, formatdata.race);
  // Si nous avons deux personnages, alors on affiche le bouton de Combat
  // Sinon on vide le formulaire pour que le joueur puisse créer un autre personnage.
  if (joueur1.characteres.length === 2) {
    // Cacher le formulaire de création de personnage
    $('.formCharactere').addClass('hide');
    // Afficher le bouton de combat
    $('.startFight').removeClass('hide');
  } else {
    // ajout d'une notification au joueur
    $('.notification').text('Il faut second personnage pour combattre !');
    // Vide le formulaire
    $('.formCharactere input[type=text]').val('');
  }
})

$('.startFight').on('click', function(e) {
  e.preventDefault();
  // Prévention au cas ou on lance le combat sans avoir deux personnages
  if (joueur1.characteres.length !== 2) {
    return;
  }
  // Création de l'arene
  var arena = new Arena('Kind');
  // On prépare le combat.
  var fight1 = new Fight(joueur1.characteres[0], joueur1.characteres[1], arena);
  fight1.prepareToFight();
})
