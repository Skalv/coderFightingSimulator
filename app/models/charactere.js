const Charactere = function(name, classe, race) {
  this.name = name;
  this.class = classe;
  this.race = race;

  this.life = 100;
  this.attack = 10;
  this.defense = 10;
  this.experience = 0;
  this.speed = 10;

  this.inventory = [];
  this.power = null;
  this.level = 1;
}

Charactere.prototype.toAttack = function() {
  console.log(this.name + " attaque !");
}

Charactere.prototype.toDefend = function() {
  console.log(this.name + " attaque !");
}

Charactere.prototype.isMort = function() {
  console.log(this.name + " est mort");
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

Charactere.prototype.equip = function(item) {
  console.log('Vous équipez ' + item.name);
}

Charactere.prototype.drop = function(item) {
  console.log("vous perdez " + item.name);
}

module.exports = Charactere;
