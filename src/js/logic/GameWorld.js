var Ship = require('./Ship');

var GameWorld = function(game) {
  this.game = game;

  var ship_config = JSON.parse(game.cache.getText('ship_config'));
  this.ship = new Ship(ship_config, this);

};

module.exports = GameWorld;

GameWorld.prototype = {
  worldTime: 0,
  tick: function(deltaT) {
    this.worldTime += deltaT;
    this.ship.crew.forEach(function(crewMember){
      crewMember.tick(deltaT);
    });
  },
  ship: null,
  map: null,
}
