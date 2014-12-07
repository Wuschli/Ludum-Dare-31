var CargoDisplay = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;

  this.entries = [];
  var yOffset = 0;
  var xOffset = 0;
  var columnLength = 5;

  for (var goodName in this.game.config.tradingGoods) {
    var entry = {};
    var good = this.game.config.tradingGoods[goodName];
    entry.good = good;
    entry.goodName = goodName;
    entry.ship = this.gameWorld.ship;

    entry.icon = this.game.add.image(xOffset, yOffset, good.icon, 0, this);
    entry.label = this.game.add.text(entry.icon.width + entry.icon.x, entry.icon.y + Math.round(entry.icon.height / 2), '', {
      font: '22px VT323',
      fill: '#000000',
      align: 'left'
    }, this);
    entry.label.anchor.y = 0.5;

    this.entries.push(entry);
    yOffset += entry.icon.height;
    if (this.entries.length % columnLength === 0) {
      yOffset = 0;
      xOffset += entry.icon.width + 80;
    }
  }
};

module.exports = CargoDisplay;

CargoDisplay.prototype = Object.create(Phaser.Group.prototype);
CargoDisplay.prototype.constructor = CargoDisplay;

CargoDisplay.prototype.update = function() {
  this.entries.forEach(function(entry) {
    var onShip = this.gameWorld.ship.cargo[entry.goodName] && this.gameWorld.ship.cargo[entry.goodName].count > 0;
    entry.icon.visible = onShip;
    entry.label.visible = onShip;
    if (onShip){
      entry.label.setText(this.gameWorld.ship.cargo[entry.goodName].count.toFixed(2));
    }
  }, this);
};
