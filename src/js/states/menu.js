var Menu = function() {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function() {
    var x = this.world.centerX;
    var y = this.world.centerY;


    this.text = this.add.text(x, y, "Press to Start", {
      font: "65px VT323",
      fill: "#EBCB96",
      align: "center"
    });
    this.text.anchor.setTo(0.5, 0.5);

    this.infoText = this.add.text(x, y + 50, this.game.cache.getText('about'), {
      font: "22px VT323",
      fill: "#EBCB96",
      align: "center"
    });
    this.infoText.anchor.setTo(0.5, 0);

    this.input.onDown.add(this.onDown, this);
  },

  update: function() {},

  onDown: function() {
    this.game.state.start('Game');
  }
};
