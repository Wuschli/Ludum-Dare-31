// Class to describe the game logic for the ship

var CrewMember = require('./CrewMember');

var Ship = function(config, gameWorld){
  this.energy = config.energy;
  this.gameWorld = gameWorld;

  var captain = new CrewMember('Captain', this);
  captain.money = 0;
  captain.salary = 0;
  this.crew.push(captain);

  var crewCount = Math.floor(Math.random() * 3) + 3;
  for (var i = 0; i < crewCount; i++){
    this.crew.push(new CrewMember('Crew Member ' + (i + 1), this));
  }
};

module.exports = Ship;

Ship.prototype = {
  cargo: [], // trading goods, water, food, etc.
  energy: 0,
  crew: [],
  captain: null,
  position: {}, // not sure how to fill this yet
  addCrew: function(newMember){
    newMember.ship = this;
    this.crew.push(newMember);
  },
  removeCrew: function(oldMember){
    this.crew.remove(oldMember);
    oldMember.ship = null;
  }
};
