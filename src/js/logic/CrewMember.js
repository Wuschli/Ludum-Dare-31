// Class to describe the game logic for a crew member

var CrewMember = function(name, ship) {
  this.salary = Math.floor(Math.random() * 50) + 100;
  this.money = Math.floor(Math.random() * 350) + 50;
  this.hungerCost = Math.random() * 0.35;
  this.thirstCost = Math.random() * 0.55;
  this.age = Math.floor(Math.random() * 15) + 25;
  this.salaryPeriod = Math.floor(Math.random() * 3) + 28;
  this.name = name;
  this.ship = ship;
};

module.exports = CrewMember;

CrewMember.prototype = {
  salary: 0,
  salaryPeriod: 0,
  timeSinceLastSalary: 0,
  money: 0,
  hunger: 0,
  thirst: 0,
  hungerCost: 0,
  thirstCost: 0,
  ship: null,
  name: '',
  age: 0,
  tick: function(deltaT) {
    this.hunger += 0.1 * deltaT * this.hungerCost;
    this.thirst += 0.1 * deltaT * this.thirstCost;
    this.timeSinceLastSalary += deltaT;
    if (this.salary && (this.timeSinceLastSalary >= this.salaryPeriod)) {
      console.log(this.name + ' has payday and earns ' + this.salary);
      this.money += this.salary;
      this.timeSinceLastSalary -= this.salaryPeriod;
    }
  },
  getAge: function() {
    return this.age + Math.floor(this.ship.gameWorld.worldTime / 365);
  }
};
