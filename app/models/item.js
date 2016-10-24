var Item = function(type, name, atk, def, desc, spd) {
  this.type = type;
  this.name = name;
  this.attack = atk;
  this.defense = def;
  this.description = desc;
  this.speed = spd;
}

module.exports = Item;
