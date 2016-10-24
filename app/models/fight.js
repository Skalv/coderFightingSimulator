var Fight = function(char1, char2, arena) {
  this.char1 = char1;
  this.char2 = char2;
  this.arena = arena;

  this.winner = null;
  this.looser = null;

  this.timestamp = Date.now();
  this.rounds    = 0;
}

Fight.prototype.round = function(attacker, defenser) {
  // On incrémente le compteur de round
  this.rounds++;
  // l'attaquant attaque.
  var attackerDegat = attacker.toAttack(); // on calcule ses dégats.
  // Le defenseur subit.
  defenser.toDefend(attackerDegat); // Le defenseur subit le nombre de dégats de l'attaquant.
  console.log("FIGHT !!!");
}

Fight.prototype.roundEnd = function() {
  console.log("And the winner is ");
}

Fight.prototype.prepareToFight = function() {
  // On prépare le combat
  console.log(this.char1.name + " VS " + this.char2.name + " in " + this.arena.name);

  // Déterminer qui commence.
  // Si le premier perso à plus de speed que le second.
  if (this.char1.speed > this.char2.speed) {
    // L'attaquant est le premier perso.
    var attacker = this.char1;
    // Le defenseur est le second.
    var defenser = this.char2;
  } else if (this.char2.speed > this.char1.speed) {
    // Si le second perso à plus de speed que le premier, il est l'attaquant.
    var attacker = this.char2;
    var defenser = this.char1;
  } else {
    // Si les deux persos on la même valeur de speed.
    // L'attaquant est choisi au hasard.
    var rand = Math.floor((Math.random() * 2) + 1);
    if (rand === 1) {
      var attacker = this.char1;
      var defenser = this.char2;
    } else {
      var attacker = this.char2;
      var defenser = this.char1;
    }
  }

  console.log(attacker.name + " attaque en premier");
  console.log(defenser.name + " defend en premier");

  // On lance le combat
  this.round(attacker, defenser);
}

module.exports = Fight;
