var Team = function(name) {
  this.name = name;
  this.players = [];
}

Team.prototype.getPlayers = function() {
  return this.players;
}

Team.prototype.addPlayer = function(player) {
  this.players.push(player);
  player.chooseTeam(this);
}

module.exports = Team;
