// Class to describe the game logic for a crew member

var CrewMember = function(name, ship){
  this.salary = Math.floor(Math.random() * 50) + 100;
  this.money = Math.floor(Math.random() * 350) + 50;
  this.hungerCost = Math.random() * 0.35;
  this.thirstCost = Math.random() * 0.55;
  this.age = Math.floor(Math.random() * 15) + 25;
  this.name = name;
  this.ship = ship;
};

module.exports = CrewMember;

CrewMember.prototype = {
  salary: 0,
  money: 0,
  hunger: 0,
  thirst: 0,
  hungerCost: 0,
  thirstCost: 0,
  ship: null,
  name: '',
  age: 0,
  tick: function(deltaT){
    this.hunger += 0.1 * this.hungerCost;
    this.thirst += 0.1 * this.thirstCost;
  },
  getAge: function(){
    return this.age + Math.floor(this.ship.gameWorld.worldTime / 365);
  }
};
