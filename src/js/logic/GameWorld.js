var Ship = require('./Ship');

var GameWorld = function(game) {
  this.game = game;

  var ship_config = JSON.parse(game.cache.getText('ship_config'));
  this.ship = new Ship(ship_config, this);
  console.log(this.ship.cargo);
};

module.exports = GameWorld;

GameWorld.prototype = {
  worldTime: 0,
  tick: function(deltaT) {
    this.worldTime += deltaT;
    var hasCaptain = false;
    this.ship.crew.forEach(function(crewMember) {
      crewMember.tick(deltaT);
      if (crewMember.class === 'captain') {
        hasCaptain = true;
      }
    });
    if (!hasCaptain) {
      this.game.state.start('GameOver');
    }
  },
  ship: null,
  map: null,
}
