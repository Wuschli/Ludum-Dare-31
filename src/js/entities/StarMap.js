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

  this.targetPointer = this.game.add.image(0, 0, 'target_pointer', 0, this);
  this.targetPointer.anchor.x = 0.5;
  this.targetPointer.anchor.y = 0.5;

  this.hitArea = new Phaser.Rectangle(0, 0, 240, 240);
  this.offset = {
    x: 0,
    y: 0
  };

  this.game.input.onTap.add(function() {
    var position = this.toLocal(this.game.input.activePointer.position);
    if (!Phaser.Rectangle.containsPoint(this.hitArea, position)) {
      return;
    }
    var scale = this.gameWorld.map.mapScale;
    var pointOnMap = {
      x: (position.x - this.offset.x) * scale,
      y: (position.y - this.offset.y) * scale,
    };
    var nearest = null;
    var shortestDistance = -1;
    this.gameWorld.map.planets.forEach(function(planet) {
      var distance = Math.sqrt(Math.pow(pointOnMap.x - planet.position.x, 2) + Math.pow(pointOnMap.y - planet.position.y, 2));
      if (shortestDistance < 0 || distance < shortestDistance) {
        nearest = planet;
        shortestDistance = distance;
      }
    }, this);
    if (shortestDistance / scale <= 10) {
      this.gameWorld.ship.target = nearest;
    }
  }, this);
};

module.exports = StarMap;

StarMap.prototype = Object.create(Phaser.Group.prototype);
StarMap.prototype.constructor = StarMap;

StarMap.prototype.update = function() {
  this.graphics.clear();
  var self = this;
  var scale = this.gameWorld.map.mapScale;
  this.offset = {
    x: -this.gameWorld.ship.position.x / scale + 120,
    y: -this.gameWorld.ship.position.y / scale + 120
  };
  var alpha = 0;

  //draw ship
  this.graphics.beginFill(0x0000FF, 1);
  var ship = this.gameWorld.ship;
  this.graphics.drawRect(120 - 4, 120 - 4, 8, 8);
  this.graphics.endFill();

  this.gameWorld.map.planets.forEach(function(planet) {
    self.graphics.lineStyle(1, 0xFFFFFF, 0.25);
    self.graphics.drawCircle(self.offset.x, self.offset.y, planet.orbit / scale * 2);
    self.graphics.lineStyle(0, 0, 0);

    self.graphics.beginFill(0xFF0000, 1);
    self.graphics.drawRect(planet.position.x / scale - 2 + self.offset.x, planet.position.y / scale - 2 + self.offset.y, 4, 4);
    self.graphics.endFill();

    if ((planet === ship.target) && (ship.status === 'space')){
      this.targetPointer.x = planet.position.x / scale + self.offset.x;
      this.targetPointer.y = planet.position.y / scale + self.offset.y;
      alpha = 1;
    }
  }, this);

  this.targetPointer.alpha = alpha;

  //draw sun
  this.graphics.beginFill(0xFFFFCF, .3);
  this.graphics.drawRect(this.offset.x - 4, this.offset.y - 4, 8, 8);
  this.graphics.endFill();
  this.graphics.beginFill(0xFFFFFF, 1);
  this.graphics.drawRect(this.offset.x - 2, this.offset.y - 2, 4, 4);
  this.graphics.endFill();


  //draw frame
  this.graphics.lineStyle(4, 0xFFFFFF, 1);
  this.graphics.drawRect(2, 2, 236, 236);
};
