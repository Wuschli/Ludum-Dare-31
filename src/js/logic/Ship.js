// Class to describe the game logic for the ship

var CrewMember = require('./CrewMember');

var Ship = function(config, gameWorld) {
  this.energy = config.energy;
  this.cargo = config.cargo;
  this.speed = config.speed;
  this.gameWorld = gameWorld;
  this.target = this.gameWorld.map.planets[0];
  this.position = this.target.positionAt(0);

  var captain = new CrewMember('Captain', this);
  captain.money = config.money;
  captain.salary = 0;
  captain.class = 'captain';
  this.crew.push(captain);
  this.captain = captain;

  var crewCount = Math.floor(Math.random() * 3) + 3;
  for (var i = 0; i < crewCount; i++) {
    this.crew.push(new CrewMember('Crew Member ' + (i + 1), this));
  }
};

module.exports = Ship;

Ship.prototype = {
  cargo: [], // trading goods, water, food, etc.
  energy: 0,
  crew: [],
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
    this.cargo.forEach(function(cargo) {
      if (cargo.type === 'food') {
        value += cargo.count;
      }
    });
    return value;
  },
  getDrinks: function() {
    var value = 0;
    this.cargo.forEach(function(cargo) {
      if (cargo.type === 'drink') {
        value += cargo.count;
      }
    });
    return value;
  },
  tick: function(deltaT) {
    if (this.position.distance(this.target.position) < this.speed) {
      if (this.status === 'space') {
        this.status = 'orbit';
      }
      this.position = this.target.positionAt(this.gameWorld.worldTime + deltaT);
    } else if (this.status === 'landed') {
      this.status = 'orbit';
    } else {
      this.status = 'space';
      var targetPosition = this.target.positionAt(this.gameWorld.worldTime + deltaT);
      var direction = Phaser.Point.subtract(targetPosition, this.position);
      direction.setMagnitude(Math.min(this.speed * deltaT, direction.getMagnitude()));
      this.position = Phaser.Point.add(this.position, direction);
    }
  }
};
