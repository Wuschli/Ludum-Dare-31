var Preloader = function (game) {
  this.ready = true;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.text('ship_config', 'assets/config/ship.json');
    this.load.image('unknown_portrait', 'assets/images/unknown_portrait.png');
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('position_marker', 'assets/images/position_marker.png');
    this.load.image('crew_member_info_background', 'assets/images/crew_member_info_background.png');
  },

  create: function () {
  },

  update: function () {
    if (!!this.ready) {
      this.game.state.start('Menu');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
