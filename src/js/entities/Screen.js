var CrewList = require('./CrewList');
var Ship = require('./Ship.js');
var MenuBar = require('./MenuBar.js');

var Screen = function(game, gameWorld) {
  Phaser.Group.call(this, game);

  this.gameWorld = gameWorld;

  this.crewList = this.add(new CrewList(this.game));
  this.menuBar = this.add(new MenuBar(this.game, this.gameWorld));
  this.ship = this.add(new Ship(this.game, this.gameWorld));

  this.redrawCrewList();
  this.crewList.x = this.game.world.width - 2;
  this.crewList.y = 2;

  this.ship.x = this.game.world.width / 2 - this.ship.width / 2;
  this.ship.y = (this.game.world.height - this.menuBar.height) / 2 - this.ship.height / 2;

  this.menuBar.x = this.game.world.width / 2 - this.menuBar.width / 2;
  this.menuBar.y = this.game.world.height - this.menuBar.height;

};

module.exports = Screen;

Screen.prototype = Object.create(Phaser.Group.prototype);
Screen.prototype.constructor = Screen;

Screen.prototype.redrawCrewList = function() {
  this.crewList.redraw(this.gameWorld.ship.crew);
};

Screen.prototype.update = function(){
  this.redrawCrewList();
  this.menuBar.update();
};
