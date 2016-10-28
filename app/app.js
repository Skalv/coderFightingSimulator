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
var itemType = ["bottes", "pantalon", "torse", "gants", "casque", "mainGauche", "mainDroite", "power"];
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

// Retourne tous les objets en fonction du type passé en argument
var getItemByType = function(type) {
  var returnedItems = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].type === type) {
      returnedItems.push(items[i]);
    }
  }
  return returnedItems;
}
var getItemByName = function(name) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name === name) {
      return items[i];
    }
  }
}
var populateSelectItem = function(type, el) {
  // recherche les item par types
  var liste = getItemByType(type);
  // On vide le select pour éviter les doublons
  $("select[name="+type+"]", el).empty();
  // Inject une option vide
  $("select[name="+type+"]", el).append("<option></option>");
  // inject dans le selecteur chaque item
  for (var i = 0; i < liste.length; i++) {
    $("select[name="+type+"]", el).append("<option>" + liste[i].name + "</option>");
  }
}

var initCharArray = function(el, perso) {
  // Ajoute le nom du perso aux données de l'élément afin de le retrouver plus tard
  el.data("char-name", perso.name);
  $('.name', el).text(perso.name);
  $('.classe', el).text(perso.class);
  $('.race', el).text(perso.race);
  $('.lvl', el).text(perso.level);

  $('.attack', el).text(perso.attack);
  $('.defense', el).text(perso.defense);
  $('.speed', el).text(perso.speed);
  $('.life', el).text(perso.life);
  $('.xp', el).text(perso.experience);

  populateSelectItem('casque', el);
  populateSelectItem('torse', el);
  populateSelectItem('gants', el);
  populateSelectItem('pantalon', el);
  populateSelectItem('mainGauche', el);
  populateSelectItem('mainDroite', el);
  populateSelectItem('power', el);
  populateSelectItem('bottes', el);

  el.removeClass('hide');
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
  switch (joueur1.characteres.length) {
    case 1:
      initCharArray($('.perso1'), joueur1.characteres[0]);
      break;
    case 2:
      initCharArray($('.perso2'), joueur1.characteres[1]);
      break;
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

// Listener pour chanque changement d'item.
$('.charStats select').on('change', function(e) {
  e.preventDefault();
  // Récup du tableau
  var statsTab = $(this).closest(".table");
  // Récup du perso qui est stocké dans les données de l'élément
  var charName = statsTab.data("char-name");
  // Récup de l'Objet Personnage
  var char = joueur1.getCharactere(charName);
  // Récup le nom de l'item.
  var itemName = $(this).val();
  // Récup de l'objet Items
  var item = getItemByName(itemName);
  // Le personnage équipe l'item sélectionné
  char.equip(item);
  // On rénitialise le tableau de stats du perso
  initCharArray(statsTab, char);
})
