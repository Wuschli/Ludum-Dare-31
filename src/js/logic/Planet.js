// Class to describe the game logic for a planet

var Planet = function(){
  this.orbit = Math.random() * 20000 + 500;
  this.yearLength = Math.floor(Math.random() * 300) + 215;
  this.position = {x: 0, y: 0};
  this.offset = Math.floor(Math.random() * this.yearLength);
};

module.exports = Planet;

Planet.prototype = {
};
