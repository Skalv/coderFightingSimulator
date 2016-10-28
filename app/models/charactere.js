const Charactere = function(name, classe, race) {
  this.name = name;
  this.class = classe;
  this.race = race;

  this.life = 100;
  this.attack = 10;
  this.defense = 10;
  this.experience = 0;
  this.speed = 10;

  this.inventory = {};
  this.power = null;
  this.level = 1;
}

Charactere.prototype.toAttack = function() {
  var multiplier = Math.random() * 2 + 1;
  var degats = Math.ceil(this.attack * multiplier);
  $(".fightLog").append("<li>"+ this.name + " inflige : " + degats + " degats</li>");
  return degats;
}

Charactere.prototype.toDefend = function(degats) {
  // On calcule le nombre de degats subit en fonction de sa defense
  var multiplier = Math.random() * 2 + 1;
  degats = Math.ceil(degats - (this.defense/multiplier));
  // Damage conno't be negatifs
  degats = (degats >= 0)? degats : 1;
  // Le personnage subit les degats moins la réduction
  this.life -= degats;
  $(".fightLog").append("<li>"+ this.name + " reçoit : " + degats + " degats, il lui reste : " + this.life +"</li>");
}

Charactere.prototype.isDead = function() {
  return (this.life <= 0);
}

Charactere.prototype.gainXp = function(xp) {
  console.log(this.name + " gagne " + xp + " d'XP");
}

Charactere.prototype.dropXp = function(xp) {
  console.log(this.name + " perd " + xp + " d'XP");
}

Charactere.prototype.getLevel = function() {
  console.log(this.name + " est niveau " + this.level);
}

// bottes, pantalon, torse, gants, casque
// main gauche, main droite, power
Charactere.prototype.equip = function(item) {
  // Liste des items autorisés.
  var authorizedItem = ["bottes", "pantalon", "torse", "gants", "casque", "main gauche", "main droite", "power"];
  // Test si le type de l'item passé en argument est autorisé ou nom.
  if (authorizedItem.includes(item.type)) {
    // Si j'ai déjà un objet d'équipé je le retire.
    if (this.inventory[item.type]) {
      this.drop(this.inventory[item.type]);
    }
    // J'équipe l'objet
    this.inventory[item.type] = item;
    // Modification des stats du perso.
    this.attack  += item.attack;
    this.defense += item.defense;
    this.speed   += item.speed;

    console.log('Vous équipez ' + item.name);
  } else {
    console.log("Le type de l'item n'est pas autorisé");
  }
}

Charactere.prototype.drop = function(item) {
  // Si notre item est équipé.
  if (this.inventory[item.type] === item) {
    // On retire de l'inventaire
    this.inventory[item.type] = null;
    // On retire les stats de l'objet
    this.attack  -= item.attack;
    this.defense -= item.defense;
    this.speed   -= item.speed;

    console.log("Vous retirez " + item.name);
  } else {
    console.log("Vous n'avez pas équipé cet objet.");
  }
}

module.exports = Charactere;
