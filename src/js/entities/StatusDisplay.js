var moment = require('moment');

var StatusDisplay = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;
  var yOffset = 0;
  this.timeLabel = this.game.add.text(0, yOffset, 'Day ' + moment.duration(this.gameWorld.worldTime).asDays(), {
    font: '12px TinyPixy',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.timeLabel.height + 2;

  this.moneyLabel = this.game.add.text(0, yOffset, this.gameWorld.ship.captain.money + ' Credits', {
    font: '12px TinyPixy',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.moneyLabel.height + 2;

  this.ageLabel = this.game.add.text(0, yOffset, this.gameWorld.ship.captain.getAge() + ' Years', {
    font: '12px TinyPixy',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.ageLabel.height + 2;

  this.foodLabel = this.game.add.text(0, yOffset, this.gameWorld.ship.getFood().toFixed(2) + ' Meals', {
    font: '12px TinyPixy',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.foodLabel.height + 2;

  this.drinkLabel = this.game.add.text(0, yOffset, this.gameWorld.ship.getDrinks().toFixed(2) + ' Drinks', {
    font: '12px TinyPixy',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.drinkLabel.height + 2;
};

module.exports = StatusDisplay;

StatusDisplay.prototype = Object.create(Phaser.Group.prototype);
StatusDisplay.prototype.constructor = StatusDisplay;

StatusDisplay.prototype.update = function(){
  this.timeLabel.setText('Day ' + moment.duration(this.gameWorld.worldTime, 'd').asDays());
  this.moneyLabel.setText(this.gameWorld.ship.captain.money + ' Credits');
  this.ageLabel.setText(this.gameWorld.ship.captain.getAge() + ' Years');
  this.drinkLabel.setText(this.gameWorld.ship.getDrinks().toFixed(2) + ' Drinks');
  this.foodLabel.setText(this.gameWorld.ship.getFood().toFixed(2) + ' Meals');
};
