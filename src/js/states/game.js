var GameWorld = require('../logic/GameWorld');
var Screen = require('../entities/Screen');

var Game = function() {};

module.exports = Game;

Game.prototype = {

  create: function() {
    this.gameWorld = new GameWorld(this.game);
    this.add.group(new Screen(this.game, this.gameWorld));
    this.worldTicker = this.game.time.create(false);
    var tickLoop = this.worldTicker.loop(400, this.gameWorld.tick, this.gameWorld, 3);
    this.worldTicker.start();
  },

  update: function() {

  }
};
