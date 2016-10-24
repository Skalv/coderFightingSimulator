var Team = function(name) {
  this.name = name;
  this.players = [];
}

Team.prototype.getPlayers = function() {
  return this.players;
}

module.exports = Team;
