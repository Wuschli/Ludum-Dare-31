var Ship = require('./Ship');
var StarMap = require('./StarMap');

var GameWorld = function(game) {
  this.game = game;

  this.map = new StarMap();

  var ship_config = JSON.parse(game.cache.getText('ship_config'));
  this.ship = new Ship(ship_config, this);
};

module.exports = GameWorld;

GameWorld.prototype = {
  worldTime: 0,
  ship: null,
  map: null,
  timeScale: 1,
  tick: function(deltaT) {
    if (this.ship.status === 'landed'){
      deltaT = 0.01 * deltaT;
    }
    if (this.ship.status === 'orbit'){
      deltaT = 0.1 * deltaT;
    }
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
}
