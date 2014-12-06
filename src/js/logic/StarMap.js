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
    var self = this;
    this.planets.forEach(function(planet) {
      planet.position.x = Math.sin(self.gameWorld.worldTime / planet.yearLength + planet.offset) * planet.orbit;
      planet.position.y = Math.cos(self.gameWorld.worldTime / planet.yearLength + planet.offset) * planet.orbit;
    });
  }
};
