const Charactere = require('./charactere');

const Player = function(pseudo, email, password) {
  this.pseudo = pseudo;
  this.email = email;
  this.password = password;
  this.team = null;
  this.characteres = [];
}

Player.prototype.chooseTeam = function(team) {
  this.team = team;
}

Player.prototype.createCharactere = function(nom, race, classe) {
  var newChar = new Charactere(nom, classe, race);
  this.characteres.push(newChar);
  return newChar;
}

Player.prototype.getCharactere = function (name) {
  var index = this.characteres.findIndex(function(char, indice) {
    if (char.name === name) {
      return char;
    } else {
      return false;
    }
  });

  if (index < 0) {
    return 'Aucun personnage trouvé';
  } else {
    return this.characteres[index];
  }


}

module.exports = Player;
