var Ship = function(game, gameWorld) {
  Phaser.Group.call(this, game);

  this.gameWorld = gameWorld;
  this.plan = this.create(0, 0, 'ship');
};

module.exports = Ship;

Ship.prototype = Object.create(Phaser.Group.prototype);
Ship.prototype.constructor = Ship;
