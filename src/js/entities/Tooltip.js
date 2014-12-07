var SlicedSprite = require('./SlicedSprite');

var Tooltip = function(game, maxWidth) {
  Phaser.Group.call(this, game);

  this.content = '';
  this.slicedSprite = this.add(new SlicedSprite(this.game, 'tooltip_background', {
    left: 12,
    right: 12,
    top: 12,
    bottom: 12
  }));

  this.label = this.game.add.text(this.slicedSprite.borders.left, this.slicedSprite.borders.top, '', {
    font: '20px VT323',
    fill: '#000000',
    align: 'left'
  }, this);

  if (maxWidth) {
    this.maxWidth = maxWidth;
    this.label.wordWrap = true;
    this.label.wordWrapWidth = this.maxWidth;
  }
  this.visible = false;
};

module.exports = Tooltip;

Tooltip.prototype = Object.create(Phaser.Group.prototype);
Tooltip.prototype.constructor = Tooltip;

Tooltip.prototype.update = function() {
  if (!this.visible) {
    return;
  }
  this.position = this.game.input.activePointer.position;
  if (this.content.call) {
    this.label.setText(this.content.call(this.callContext));
    this.slicedSprite.setSize({
      x: this.label.width,
      y: this.label.height
    });
  }
};

Tooltip.prototype.show = function(content, context) {
  this.visible = true;
  this.content = content;
  this.callContext = context;

  if (this.content.call) {
    this.label.setText(this.content.call(this.callContext));
  } else {
    this.label.setText(this.content);
  }
  this.slicedSprite.setSize({
    x: this.label.width,
    y: this.label.height
  });
};

Tooltip.prototype.hide = function() {
  this.visible = false;
};
