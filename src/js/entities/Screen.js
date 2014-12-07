var CrewList = require('./CrewList');
var Ship = require('./Ship');
var MenuBar = require('./MenuBar');
var Tooltip = require('./Tooltip');

var Screen = function(game, gameWorld) {
  Phaser.Group.call(this, game);

  this.gameWorld = gameWorld;

  this.game.tooltip = this.add(new Tooltip(this.game, 300), this);
  this.game.tooltip.x = 100;
  this.game.tooltip.y = 100;

  this.ship = this.add(new Ship(this.game, this.gameWorld));
  this.crewList = this.add(new CrewList(this.game));
  this.menuBar = this.add(new MenuBar(this.game, this.gameWorld));

  this.redrawCrewList();
  this.crewList.x = this.game.world.width - 8;
  this.crewList.y = 8;

  this.ship.x = Math.floor((this.game.world.width - this.crewList.width) / 2 - this.ship.width / 2);
  this.ship.y = Math.floor((this.game.world.height - 248) / 2 - this.ship.height / 2);

  this.menuBar.x = Math.floor(this.game.world.width / 2);
  this.menuBar.y = this.game.world.height - 248;

  this.bringToTop(this.game.tooltip);
};

module.exports = Screen;

Screen.prototype = Object.create(Phaser.Group.prototype);
Screen.prototype.constructor = Screen;

Screen.prototype.redrawCrewList = function() {
  this.crewList.redraw(this.gameWorld.ship.crew);
};

Screen.prototype.update = function() {
  this.redrawCrewList();
  this.ship.update();
  this.menuBar.update();
  this.game.tooltip.update();
};
