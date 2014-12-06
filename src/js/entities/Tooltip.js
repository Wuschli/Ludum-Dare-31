var SlicedSprite = require('./SlicedSprite');

var Tooltip = function(game, content, maxWidth) {
  Phaser.Group.call(this, game);

  this.content = content;


  this.slicedSprite = this.add(new SlicedSprite(this.game, 'tooltip_background', {
    left: 12,
    right: 12,
    top: 12,
    bottom: 12
  }));

  this.text = this.game.add.text(this.slicedSprite.borders.left, this.slicedSprite.borders.top, this.content, {
    font: '20px VT323',
    fill: '#000000',
    align: 'left'
  }, this);

  if (maxWidth){
    this.maxWidth = maxWidth;
    this.text.wordWrap= true;
    this.text.wordWrapWidth = this.maxWidth;
  }

  this.slicedSprite.setSize({
    x: this.text.width,
    y: this.text.height
  });

};

module.exports = Tooltip;

Tooltip.prototype = Object.create(Phaser.Group.prototype);
Tooltip.prototype.constructor = Tooltip;
