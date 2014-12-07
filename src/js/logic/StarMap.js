// Class to describe the game logic for the star map

var Planet = require('./Planet');

var StarMap = function(gameWorld) {
  this.gameWorld = gameWorld;

  var planetCount = Math.floor(Math.random() * 8) + 6;
  for (var i = 0; i < planetCount; i++) {
    var planet = new Planet();
    this.planets.push(planet);
  }

  this.mapScale = 100;
};

module.exports = StarMap;

StarMap.prototype = {
  planets: [],
  update: function() {
    this.planets.forEach(function(planet) {
      planet.position = planet.positionAt(this.gameWorld.worldTime);
    }, this);
  }
};
