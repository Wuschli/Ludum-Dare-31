// Class to describe the game logic for a planet

var Planet = function() {
  this.orbit = Math.random() * 20000 + 500;
  this.yearLength = (Math.floor(Math.random() * 300) + 215);
  this.position = new Phaser.Point(0, 0);
  this.offset = Math.random() * this.yearLength;
  this.refuelCost = Math.random() * 100 + 50;
};

module.exports = Planet;

Planet.prototype = {
  positionAt: function(time) {
    var position = new Phaser.Point(
      Math.sin(time / this.yearLength + this.offset) * this.orbit,
      Math.cos(time / this.yearLength + this.offset) * this.orbit
    );
    return position;
  },
};
