// Class to describe the game logic for the ship

var CrewMember = require('./CrewMember');
var chance = require('chance').Chance(Math.random());

var Ship = function(config, gameWorld) {
  this.gameWorld = gameWorld;

  this.energyConsumption = config.energyConsumption;
  this.energy = 1;
  this.cargo = {};
  for (var name in config.cargo) {
    var good = this.gameWorld.game.config.tradingGoods[name];
    var cargo = {
      type: good.type,
      count: config.cargo[name]
    };
    this.cargo[name] = cargo;
  }
  this.speed = config.speed;
  this.target = this.gameWorld.map.planets[0];
  this.position = this.target.positionAt(0);

  this.crew = [];
  var name = chance.name();
  var captain = new CrewMember(name, this, this.gameWorld);
  captain.money = config.money;
  captain.salary = 0;
  captain.class = 'captain';
  this.crew.push(captain);
  this.captain = captain;

  var crewCount = Math.floor(Math.random() * 3) + 3;
  for (var i = 0; i < crewCount; i++) {
    var name = chance.name();
    this.crew.push(new CrewMember(name, this, this.gameWorld));
  }
};

module.exports = Ship;

Ship.prototype = {
  captain: null,
  status: 'landed',
  speed: 100,
  addCrew: function(newMember) {
    newMember.ship = this;
    this.crew.push(newMember);
  },
  removeCrew: function(oldMember) {
    this.crew.remove(oldMember);
    oldMember.ship = null;
  },
  getFood: function() {
    var value = 0;
    for (var name in this.cargo) {
      var cargo = this.cargo[name];
      if (cargo.type === 'food') {
        value += cargo.count;
      }
    }
    return value;
  },
  getDrinks: function() {
    var value = 0;
    for (var name in this.cargo) {
      var cargo = this.cargo[name];
      if (cargo.type === 'drink') {
        value += cargo.count;
      }
    }
    return value;
  },
  hasClass: function(className) {
    for (var i = 0; i < this.crew.length; i++) {
      if (this.crew[i].class === className) {
        return true;
      }
    }
    return false;
  },
  tick: function(deltaT) {
    if (this.position.distance(this.target.positionAt(this.gameWorld.worldTime + deltaT)) < this.speed) {
      if (this.status === 'space') {
        this.status = 'orbit';
      }
      this.position = this.target.positionAt(this.gameWorld.worldTime + deltaT);
    } else if (this.status === 'landed') {
      this.status = 'orbit';
    } else {
      this.status = 'space';
      var targetPosition = this.target.positionAt(this.gameWorld.worldTime);
      var duration = Phaser.Point.subtract(targetPosition, this.position).getMagnitude() / this.speed;
      if (duration < 10) {
        duration = deltaT;
      }
      var calculatedPosition = this.target.positionAt(this.gameWorld.worldTime + duration);
      var direction = Phaser.Point.subtract(calculatedPosition, this.position);
      direction.setMagnitude(Math.min(this.speed * deltaT, direction.getMagnitude()));
      this.position = Phaser.Point.add(this.position, direction);
    }

    if (this.status === 'space') {
      var energyCost = this.energyConsumption;
      if (this.hasClass('engineer')){
        energyCost *= 0.9;
      }
      this.energy -= Math.min(energyCost * deltaT, this.energy);
    }
    if (this.energy === 0) {
      this.captain.die();
    }
  }
};
