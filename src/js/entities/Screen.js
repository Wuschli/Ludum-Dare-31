var CrewList = require('./CrewList');
var StatusDisplay = require('./StatusDisplay');

var Screen = function(game, gameWorld) {
  Phaser.Group.call(this, game);

  this.gameWorld = gameWorld;

  this.crewList = this.add(new CrewList(this.game));
  this.statusDisplay = this.add(new StatusDisplay(this.game, this.gameWorld));

  this.redrawCrewList();
};

module.exports = Screen;

Screen.prototype = Object.create(Phaser.Group.prototype);
Screen.prototype.constructor = Screen;

Screen.prototype.redrawCrewList = function() {
  this.crewList.redraw(this.gameWorld.ship.crew);
  this.crewList.x = this.game.world.width - this.crewList.width - 2;
  this.crewList.y = 2;
};

Screen.prototype.update = function(){
  this.statusDisplay.update();
};
