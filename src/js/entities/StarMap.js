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

  this.gameWorld.map.planets.forEach(function(planet) {
    self.graphics.lineStyle(1, 0xFFFFFF, 0.25);
    self.graphics.drawCircle(120, 120, planet.orbit / 50);
    self.graphics.lineStyle(0, 0, 0);

    self.graphics.beginFill(0xFF0000, 1);
    self.graphics.drawRect(planet.position.x / 100 - 2 + 120, planet.position.y / 100 - 2 + 120, 4, 4);
    self.graphics.endFill();
  });

  //draw sun
  this.graphics.beginFill(0xFFFFFF, 1);
  this.graphics.drawRect(118, 118, 4, 4);
  this.graphics.endFill();

  //draw ship
  this.graphics.beginFill(0x0000FF, 1);
  var ship = this.gameWorld.ship;
  this.graphics.drawRect(ship.position.x / 100 - 2, ship.position.y / 100 - 2, 4, 4);
  this.graphics.endFill();

  //draw frame
  this.graphics.lineStyle(4, 0xFFFFFF, 1);
  this.graphics.drawRect(2, 2, 236, 236);
  this.graphics.lineStyle(0, 0, 0);
};
