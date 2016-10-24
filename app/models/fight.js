var Fight = function(char1, char2, arena) {
  this.char1 = char1;
  this.char2 = char2;
  this.arena = arena;

  this.winner = null;
  this.looser = null;

  this.timestamp = Date.now();
  this.timer = null;
}

Fight.prototype.round = function() {
  console.log("FIGHT !!!");
}
Fight.prototype.roundEnd = function() {
  console.log("And the winner is ");
}
Fight.prototype.prepareToFight = function() {
  console.log(char1.name + " VS " + char2.name);
}

module.exports = Fight;
