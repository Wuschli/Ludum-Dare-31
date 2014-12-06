var moment = require('moment');

var StatusDisplay = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;
  var ySpace = 8;
  var yOffset = 0;
  this.timeLabel = this.game.add.text(0, yOffset, '', {
    font: '22px VT323',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.timeLabel.height + ySpace;

  this.moneyLabel = this.game.add.text(0, yOffset, '', {
    font: '22px VT323',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.moneyLabel.height + ySpace;

  // this.ageLabel = this.game.add.text(0, yOffset, '', {
  //   font: '22px VT323',
  //   fill: '#ffffff',
  //   align: 'center'
  // }, this);
  // yOffset += this.ageLabel.height + ySpace;

  this.foodLabel = this.game.add.text(0, yOffset, '', {
    font: '22px VT323',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.foodLabel.height + ySpace;

  this.drinkLabel = this.game.add.text(0, yOffset, '', {
    font: '22px VT323',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.drinkLabel.height + ySpace;

  this.shipStatusLabel = this.game.add.text(0, yOffset, '', {
    font: '22px VT323',
    fill: '#ffffff',
    align: 'center'
  }, this);
  yOffset += this.shipStatusLabel.height + ySpace;
};

module.exports = StatusDisplay;

StatusDisplay.prototype = Object.create(Phaser.Group.prototype);
StatusDisplay.prototype.constructor = StatusDisplay;

StatusDisplay.prototype.update = function(){
  this.timeLabel.setText('Day ' + Math.floor(moment.duration(this.gameWorld.worldTime, 'd').asDays()));
  this.moneyLabel.setText(this.gameWorld.ship.captain.money + ' Credits');
  // this.ageLabel.setText(this.gameWorld.ship.captain.getAge() + ' Years');
  this.drinkLabel.setText(this.gameWorld.ship.getDrinks().toFixed(2) + ' Drinks');
  this.foodLabel.setText(this.gameWorld.ship.getFood().toFixed(2) + ' Meals');
  this.shipStatusLabel.setText(this.gameWorld.ship.status);
};
