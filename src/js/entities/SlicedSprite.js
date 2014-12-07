var SlicedSprite = function(game, spriteName, borders) {
  Phaser.Group.call(this, game);
  this.spriteName = spriteName;
  if (borders) {
    this.borders = borders;
  }

  for (var key in this.sprites) {
    this.sprites[key] = this.create(0, 0, this.spriteName);
  }
  this.spriteSize.x = this.sprites.center.width;
  this.spriteSize.y = this.sprites.center.height;

  this.crop();
};

module.exports = SlicedSprite;

SlicedSprite.prototype = Object.create(Phaser.Group.prototype);
SlicedSprite.prototype.constructor = SlicedSprite;

SlicedSprite.prototype.spriteName = null;
SlicedSprite.prototype.spriteSize = {
  x: 0,
  y: 0
};
SlicedSprite.prototype.sprites = {
  topLeft: null,
  topRight: null,
  left: null,
  right: null,
  bottomLeft: null,
  bottomRight: null,
  top: null,
  bottom: null,
  center: null
};
SlicedSprite.prototype.borders = {
  left: 1,
  right: 1,
  top: 1,
  bottom: 1
};
SlicedSprite.prototype.innerSize = {
  x: 1,
  y: 1
};
SlicedSprite.prototype.setBorders = function(left, right, top, bottom) {
  this.borders.left = left;
  this.borders.right = right;
  this.borders.top = top;
  this.borders.bottom = bottom;
  this.crop();
};
SlicedSprite.prototype.crop = function() {
  this.sprites.topLeft.crop(new Phaser.Rectangle(0, 0, this.borders.left, this.borders.top));
  this.sprites.topRight.crop(new Phaser.Rectangle(this.spriteSize.x - this.borders.right, 0, this.borders.right, this.borders.top));
  this.sprites.left.crop(new Phaser.Rectangle(0, this.borders.top, this.borders.left, this.spriteSize.y - this.borders.top - this.borders.bottom));
  this.sprites.right.crop(new Phaser.Rectangle(this.spriteSize.x - this.borders.right, this.borders.top, this.borders.right, this.spriteSize.y - this.borders.top - this.borders.bottom));
  this.sprites.bottomLeft.crop(new Phaser.Rectangle(0, this.spriteSize.y - this.borders.bottom, this.borders.left, this.borders.bottom));
  this.sprites.bottomRight.crop(new Phaser.Rectangle(this.spriteSize.x - this.borders.right, this.spriteSize.y - this.borders.bottom, this.borders.right, this.borders.bottom));
  this.sprites.top.crop(new Phaser.Rectangle(this.borders.left, 0, this.spriteSize.x - this.borders.right - this.borders.left, this.borders.top));
  this.sprites.bottom.crop(new Phaser.Rectangle(this.borders.left, this.spriteSize.y - this.borders.bottom, this.spriteSize.x - this.borders.right - this.borders.left, this.borders.bottom));
  this.sprites.center.crop(new Phaser.Rectangle(this.borders.left, this.borders.top, this.spriteSize.x - this.borders.right - this.borders.left, this.spriteSize.y - this.borders.top - this.borders.bottom));

  this.sprites.topLeft.x = 0;
  this.sprites.topLeft.y = 0;

  this.sprites.topRight.x = this.innerSize.x + this.borders.left;
  this.sprites.topRight.y = 0;

  this.sprites.left.x = 0;
  this.sprites.left.y = this.borders.top;
  this.sprites.left.height = this.innerSize.y;

  this.sprites.right.x = this.innerSize.x + this.borders.left;
  this.sprites.right.y = this.borders.top;
  this.sprites.right.height = this.innerSize.y;

  this.sprites.bottomLeft.x = 0;
  this.sprites.bottomLeft.y = this.innerSize.y + this.borders.top;

  this.sprites.bottomRight.x = this.innerSize.x + this.borders.left;
  this.sprites.bottomRight.y = this.innerSize.y + this.borders.top;

  this.sprites.top.x = this.borders.left;
  this.sprites.top.y = 0;
  this.sprites.top.width = this.innerSize.x;

  this.sprites.bottom.x = this.borders.left;
  this.sprites.bottom.y = this.borders.top + this.innerSize.y;
  this.sprites.bottom.width = this.innerSize.x;

  this.sprites.center.x = this.borders.left;
  this.sprites.center.y = this.borders.top;
  this.sprites.center.width = this.innerSize.x;
  this.sprites.center.height = this.innerSize.y;
};
SlicedSprite.prototype.setSize = function(size) {
  this.innerSize = size;
  this.crop();
};
