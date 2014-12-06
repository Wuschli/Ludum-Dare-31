// Class to describe the game logic for a planet

var Planet = function(){
  this.orbit = Math.random() * 10000 + 5000;
};

module.exports = Planet;

Planet.prototype = {
  positon: {x: 0, y: 0},
  orbit: 0,
};
