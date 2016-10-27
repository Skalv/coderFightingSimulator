const Player = require('./models/player');
const Team   = require('./models/team');
const Item   = require('./models/item');
const Fight  = require('./models/fight');
const Arena  = require('./models/arena');

// Création des variables globales.
var joueur1;

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

// var fight1 = new Fight(monPerso, persoAlbert, arena);
// fight1.prepareToFight();
