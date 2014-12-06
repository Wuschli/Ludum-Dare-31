var StatusDisplay = require('./StatusDisplay');
var ActionButtons = require('./ActionButtons');

var MenuBar = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;

  this.statusDisplay = this.add(new StatusDisplay(this.game, this.gameWorld));
  this.statusDisplay.x = Math.floor(-this.game.world.width / 2 + 8 + this.statusDisplay.width / 2);

  this.actionButtons = this.add(new ActionButtons(this.game, this.gameWorld));
  this.actionButtons.x = this.statusDisplay.x + 200;

};

module.exports = MenuBar;

MenuBar.prototype = Object.create(Phaser.Group.prototype);
MenuBar.prototype.constructor = MenuBar;

MenuBar.prototype.update = function(){
  this.statusDisplay.update();
  this.actionButtons.update();
};
