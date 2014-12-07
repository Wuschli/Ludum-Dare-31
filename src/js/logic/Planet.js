// Class to describe the game logic for a planet

var CrewMember = require('./CrewMember');
var chance = require('chance').Chance(Math.random());

var Planet = function(gameWorld) {
  this.gameWorld = gameWorld;
  this.orbit = Math.random() * 20000 + 500;
  this.yearLength = (Math.floor(Math.random() * 300) + 215);
  this.position = new Phaser.Point(0, 0);
  this.offset = Math.random() * this.yearLength;
  this.refuelCost = Math.random() * 100 + 50;
  this.trading = {};

  for (var goodName in this.gameWorld.game.config.tradingGoods) {
    var good = this.gameWorld.game.config.tradingGoods[goodName];
    var available = Math.round(Math.random());
    var count = available ? Math.random() * 100 * good.unit : 0;
    var price = (Math.random() + 0.5) * good.price;
    this.trading[goodName] = {
      count: count,
      price: price
    }
  }
  this.availableCrew = [];
  var crewCount = Math.floor(Math.random() * 7);
  for (var i = 0; i < crewCount; i++) {
    this.availableCrew.push(new CrewMember(chance.name(), null, this.gameWorld));
  }
};

module.exports = Planet;

Planet.prototype = {
  positionAt: function(time) {
    var position = new Phaser.Point(
      Math.sin(time / this.yearLength + this.offset) * this.orbit,
      Math.cos(time / this.yearLength + this.offset) * this.orbit
    );
    return position;
  },
};
