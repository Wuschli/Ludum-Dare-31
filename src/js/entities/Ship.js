var CargoDisplay = require('./CargoDisplay');

var Ship = function(game, gameWorld) {
  Phaser.Group.call(this, game);

  this.gameWorld = gameWorld;
  this.plan = this.create(0, 0, 'ship');
  this.cargoDisplay = this.add(new CargoDisplay(this.game, this.gameWorld));
  this.cargoDisplay.x = 370;
  this.cargoDisplay.y = 110;
};

module.exports = Ship;

Ship.prototype = Object.create(Phaser.Group.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.update = function() {
  this.cargoDisplay.update();
};
