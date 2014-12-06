
var Game = function () {
};

module.exports = Game;

Game.prototype = {

  create: function () {
  },

  update: function () {
  },

  onInputDown: function () {
    this.game.state.start('Menu');
  }
};
