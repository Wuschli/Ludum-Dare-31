var StatusDisplay = require('./StatusDisplay');
var ActionButtons = require('./ActionButtons');
var TradingButtons = require('./TradingButtons');
var HireCrewButtons = require('./HireCrewButtons');
var StarMap = require('./StarMap');

var MenuBar = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;

  this.statusDisplay = this.add(new StatusDisplay(this.game, this.gameWorld));
  this.statusDisplay.x = Math.floor(-this.game.world.width / 2 + 8 + this.statusDisplay.width / 2);

  this.actionButtons = this.add(new ActionButtons(this.game, this.gameWorld));
  this.actionButtons.x = Math.floor(-this.actionButtons.width - 4);

  this.tradingButtons = this.add(new TradingButtons(this.game, this.gameWorld));
  this.tradingButtons.x = Math.floor(4);

  this.starMap = this.add(new StarMap(this.game, this.gameWorld));
  this.starMap.x = Math.floor(this.game.world.width / 2 - 248);

  this.hireCrewButtons = this.add(new HireCrewButtons(this.game));
  this.hireCrewButtons.x = Math.floor(- 2 * (64 + 8) - this.actionButtons.width - 4);
};

module.exports = MenuBar;

MenuBar.prototype = Object.create(Phaser.Group.prototype);
MenuBar.prototype.constructor = MenuBar;

MenuBar.prototype.update = function() {
  this.statusDisplay.update();
  this.actionButtons.update();
  this.tradingButtons.update();
  this.starMap.update();
  this.hireCrewButtons.redraw(this.gameWorld.ship.target.availableCrew);
};
