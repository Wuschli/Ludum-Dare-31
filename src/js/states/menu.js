var Menu = function () {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function () {
    var x = this.world.centerX;
    var y = this.world.centerY;

    var style = { font: "65px editundo", fill: "#ffffff", align: "center" };

    this.text = this.add.text(x, y, "Press to Start", style);
    this.text.anchor.setTo(0.5, 0.5);

    this.input.onDown.add(this.onDown, this);
  },

  update: function () {
  },

  onDown: function () {
    this.game.state.start('Game');
  }
};
