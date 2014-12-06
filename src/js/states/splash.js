var Splash = function () {
};

module.exports = Splash;

Splash.prototype = {
  preload: function () {
    this.load.image('splash', 'assets/images/splash.png');
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  },
  onLoadComplete: function () {
    this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'splash'); // adding sprite to the center of the screen
    this.sprite.anchor.setTo(0.5, 0.5); // Sprites anchor is in the center of it
    var tween = this.add.tween(this.sprite);
    tween.from({alpha: 0.0});
    tween.onComplete.addOnce(this.onFadeInComplete, this);
    tween.start();
  },
  onFadeInComplete: function(){
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.onTimerComplete, this);
  },
  onFadeOutComplete: function(){
    this.game.state.start('Preloader');
  },
  onTimerComplete: function(){
    var tween = this.add.tween(this.sprite);
    tween.to({alpha: 0.0});
    tween.onComplete.addOnce(this.onFadeOutComplete, this);
    tween.start();
  }
};
