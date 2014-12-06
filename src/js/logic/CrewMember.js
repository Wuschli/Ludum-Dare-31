// Class to describe the game logic for a crew member

var CrewMember = function(name, ship) {
  this.salary = Math.floor(Math.random() * 50) + 100;
  this.money = Math.floor(Math.random() * 350) + 50;
  this.hungerCost = Math.random() * 0.05 + 0.15;
  this.thirstCost = Math.random() * 0.05 + 0.2;
  this.age = Math.floor(Math.random() * 15) + 25;
  this.salaryPeriod = Math.floor(Math.random() * 7) + 26;
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
  class: 'crew',
  tick: function(deltaT) {
    var self = this;

    this.hunger += deltaT * this.hungerCost;
    if (this.hunger >= 1) {
      this.ship.cargo.forEach(function(cargo) {
        if (cargo.type === 'food') {
          var amount = Math.min(self.hunger, cargo.count);
          cargo.count -= amount;
          self.hunger -= amount;
          console.log(self.name + ' eats ' + amount + ' of ' + cargo.name);
        }
      });
    }
    if (this.hunger >= 2) {
      console.log(this.name + ' is almost starving');
    }
    if (this.hunger >= 2) {
      console.log(this.name + ' starved to death');
      this.die();
    }

    this.thirst += deltaT * this.thirstCost;
    if (this.thirst >= 1) {
      this.ship.cargo.forEach(function(cargo) {
        if (cargo.type === 'drink') {
          var amount = Math.min(self.thirst, cargo.count);
          cargo.count -= amount;
          self.thirst -= amount;
          console.log(self.name + ' drinks ' + amount + ' of ' + cargo.name);
        }
      });
    }
    if (this.thirst >= 2) {
      console.log(this.name + ' is almost dying of thirst');
    }
    if (this.thirst >= 2) {
      console.log(this.name + ' died of thirst');
      this.die();
    }

    this.timeSinceLastSalary += deltaT;
    if (this.salary && (this.timeSinceLastSalary >= this.salaryPeriod)) {
      var amount = Math.min(this.salary, this.ship.captain.money);
      this.ship.captain.money -= amount;
      this.money += amount;
      if (amount > 0) {
        console.log(this.name + ' has  payday and earns ' + amount);
        this.timeSinceLastSalary -= this.salaryPeriod;
      }
      else if (amount < this.salary) {
        console.log('Not enough Credits to pay ' + this.name + ' enough');
        var percentage = amount / this.salary;
        this.timeSinceLastSalary -= Math.floor(this.salaryPeriod * percentage);
      }
      if (this.timeSinceLastSalary > (this.salaryPeriod * 3)){
        console.log(this.name + ' left the ship.');
        this.die();
      }
    }
  },
  getAge: function() {
    return this.age + Math.floor(this.ship.gameWorld.worldTime / 365);
  },
  die: function() {
    var index = this.ship.crew.indexOf(this);
    if (index != -1) {
      this.ship.crew.splice(index, 1);
    }
  }
};
