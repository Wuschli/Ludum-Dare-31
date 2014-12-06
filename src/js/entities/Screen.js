var CrewList = require('./CrewList');
var Ship = require('./Ship.js');
var MenuBar = require('./MenuBar');
var Tooltip = require('./Tooltip');

var Screen = function(game, gameWorld) {
  Phaser.Group.call(this, game);

  this.gameWorld = gameWorld;

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

  this.tooltip = this.add(new Tooltip(this.game, 'Hey, i am a tooltip. Really fancy and... stuff!', 50));
  this.tooltip.x = 100;
  this.tooltip.y = 100;
};

module.exports = Screen;

Screen.prototype = Object.create(Phaser.Group.prototype);
Screen.prototype.constructor = Screen;

Screen.prototype.redrawCrewList = function() {
  this.crewList.redraw(this.gameWorld.ship.crew);
};

Screen.prototype.update = function() {
  this.redrawCrewList();
  this.menuBar.update();
};
