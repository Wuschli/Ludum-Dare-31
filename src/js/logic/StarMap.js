// Class to describe the game logic for the star map

var Planet = require('./Planet');

var StarMap = function(){
  var planetCount = Math.floor(Math.random() * 8) + 11;
  for (var i = 0; i < planetCount; i++){
    var planet = new Planet();
    this.planets.push(planet);
  }
};

module.exports = StarMap;

StarMap.prototype = {
  planets: [],
};
