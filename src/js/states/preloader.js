var Preloader = function(game) {
  this.ready = true;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function() {
    this.loadingSprite = this.add.sprite(Math.floor(this.game.world.width / 2), Math.floor(this.game.world.height / 2), 'loading');
    this.loadingSprite.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.loadingSprite);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    this.load.text('ship_config', 'assets/config/ship.json');
    this.load.text('trading_goods_config', 'assets/config/trading_goods.json');
    this.load.text('crew_classes_config', 'assets/config/crew_classes.json');
    this.load.text('about', 'assets/texts/about.txt');

    this.load.image('unknown_portrait', 'assets/images/unknown_portrait.png');
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('target_pointer', 'assets/images/target_pointer.png');
    this.load.image('tooltip_background', 'assets/images/tooltip_background.png');
    this.load.image('crew_member_info_background', 'assets/images/crew_member_info_background.png');

    this.load.image('icon_food', 'assets/images/icon_food.png');
    this.load.image('icon_drink', 'assets/images/icon_drink.png');
    this.load.image('icon_medicine', 'assets/images/icon_medicine.png');
    this.load.image('icon_circuit_board', 'assets/images/icon_circuit_board.png');
    this.load.image('icon_solar_cell', 'assets/images/icon_solar_cell.png');
    this.load.image('icon_metal', 'assets/images/icon_metal.png');

    this.load.image('icon_plus', 'assets/images/icon_plus.png');
    this.load.image('icon_minus', 'assets/images/icon_minus.png');

    this.load.spritesheet('button', 'assets/images/button.png', 200, 40);
    this.load.spritesheet('button_small', 'assets/images/button_small.png', 40, 40);
    this.load.spritesheet('button_portrait', 'assets/images/button_portrait.png', 64, 64);

    this.load.audio('music', [
      'assets/music/bu-hidden-demoscenes.ogg'
    ]);

    this.load.audio('sound_engine', 'assets/sounds/engine5.wav');
  },

  create: function() {},

  update: function() {
    if (!!this.ready & !!window.fontsLoaded) {
      this.game.config = {};
      this.game.config.ship = JSON.parse(this.game.cache.getText('ship_config'));
      this.game.config.tradingGoods = JSON.parse(this.game.cache.getText('trading_goods_config'));
      this.game.config.crewClasses = JSON.parse(this.game.cache.getText('crew_classes_config'));
      this.game.state.start('Menu');
    }
  },

  onLoadComplete: function() {
    this.ready = true;
  }
};
