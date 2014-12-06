var StatusDisplay = require('./StatusDisplay');

var MenuBar = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;

  this.statusDisplay = this.add(new StatusDisplay(this.game, this.gameWorld));

};

module.exports = MenuBar;

MenuBar.prototype = Object.create(Phaser.Group.prototype);
MenuBar.prototype.constructor = MenuBar;

MenuBar.prototype.update = function(){
  this.statusDisplay.update();
};
