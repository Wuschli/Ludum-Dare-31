var Preloader = function (game) {
  this.ready = true;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.text('ship_config', 'assets/config/ship.json');
    this.load.text('about', 'assets/texts/about.txt');
    this.load.image('unknown_portrait', 'assets/images/unknown_portrait.png');
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('position_pointer', 'assets/images/position_pointer.png');
    this.load.image('tooltip_background', 'assets/images/tooltip_background.png');
    this.load.image('crew_member_info_background', 'assets/images/crew_member_info_background.png');

    this.load.spritesheet('button', 'assets/images/button.png', 200, 40);
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  },

  create: function () {
  },

  update: function () {
    if (!!this.ready & !!window.fontsLoaded) {
      this.game.state.start('Menu');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
