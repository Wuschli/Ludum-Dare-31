var GameOver = function () {
  this.text = null;
};

module.exports = GameOver;

GameOver.prototype = {

  create: function () {
    var x = this.world.centerX;
    var y = this.world.centerY;

    var style = { font: "65px VT323", fill: "#EBCB96", align: "center" };

    this.text = this.add.text(x, y, "Game Over\nClick to continue", style);
    this.text.anchor.setTo(0.5, 0.5);

    this.input.onDown.add(this.onDown, this);
  },

  update: function () {
  },

  onDown: function () {
    this.game.state.start('Menu');
  }
};
