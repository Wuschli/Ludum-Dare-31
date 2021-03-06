var GameWorld = require('../logic/GameWorld');
var Screen = require('../entities/Screen');

var Game = function() {};

module.exports = Game;

Game.prototype = {

  create: function() {

    console.log('create World');

    this.gameWorld = new GameWorld(this.game);
    this.add.group(new Screen(this.game, this.gameWorld));
    this.worldTicker = this.game.time.create(false);
    var tickLoop = this.worldTicker.loop(200, this.gameWorld.tick, this.gameWorld, this.gameWorld.timeScale);
    this.worldTicker.start();

    this.music = this.game.add.audio('music', 1, true);
    this.music.play();
  },

  update: function() {

  },

  shutdown: function(){
    this.stage.removeStageReference();
    this.worldTicker.removeAll();
    this.gameWorld = null;
  }
};
