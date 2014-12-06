var StarMap = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;

  this.graphics = this.game.add.graphics(0, 0, this);

  this.maskGraphics = this.game.add.graphics(0, 0, this);
  this.maskGraphics.beginFill(0xFFFFFF, 0);
  this.maskGraphics.drawRect(0, 0, 240, 240);
  this.maskGraphics.endFill();
  this.maskGraphics.isMask = true;
  this.graphics.mask = this.maskGraphics;
};

module.exports = StarMap;

StarMap.prototype = Object.create(Phaser.Group.prototype);
StarMap.prototype.constructor = StarMap;

StarMap.prototype.update = function() {
  this.graphics.clear();
  var self = this;
  var scale = this.gameWorld.map.mapScale;
  var offset = {
    x: -this.gameWorld.ship.position.x / scale + 120,
    y: -this.gameWorld.ship.position.y / scale + 120
  };

  //draw ship
  this.graphics.beginFill(0x0000FF, 1);
  var ship = this.gameWorld.ship;
  this.graphics.drawRect(120 - 4, 120 - 4, 8, 8);
  this.graphics.endFill();

  this.gameWorld.map.planets.forEach(function(planet) {
    self.graphics.lineStyle(1, 0xFFFFFF, 0.25);
    self.graphics.drawCircle(offset.x, offset.y, planet.orbit / scale * 2);
    self.graphics.lineStyle(0, 0, 0);

    self.graphics.beginFill(0xFF0000, 1);
    self.graphics.drawRect(planet.position.x / scale - 2 + offset.x, planet.position.y / scale - 2 + offset.y, 4, 4);
    self.graphics.endFill();
  });

  //draw sun
  this.graphics.beginFill(0xFFFFCF, .3);
  this.graphics.drawRect(offset.x - 4, offset.y - 4, 8, 8);
  this.graphics.endFill();
  this.graphics.beginFill(0xFFFFFF, 1);
  this.graphics.drawRect(offset.x - 2, offset.y - 2, 4, 4);
  this.graphics.endFill();


  //draw frame
  this.graphics.lineStyle(4, 0xFFFFFF, 1);
  this.graphics.drawRect(2, 2, 236, 236);
};
