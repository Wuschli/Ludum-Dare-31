var moment = require('moment');

var StatusDisplay = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;
  this.label = this.game.add.text(0, 0, '', {
    font: '22px VT323',
    fill: '#ffffff',
    align: 'left'
  }, this);
  this.label.lineSpacing = 8;
};

module.exports = StatusDisplay;

StatusDisplay.prototype = Object.create(Phaser.Group.prototype);
StatusDisplay.prototype.constructor = StatusDisplay;

StatusDisplay.prototype.update = function() {
  var lines = [
    'Day ' + Math.floor(moment.duration(this.gameWorld.worldTime, 'd').asDays()),
    this.gameWorld.ship.captain.money.toFixed(2) + ' Credits',
    // this.gameWorld.ship.captain.getAge() + ' Years',
    this.gameWorld.ship.getDrinks().toFixed(2) + ' Drinks',
    this.gameWorld.ship.getFood().toFixed(2) + ' Meals',
    this.gameWorld.ship.status,
    'Energy: ' + (this.gameWorld.ship.energy * 100).toFixed(2) + '%',
  ];
  this.label.setText(lines.join('\n'));
};
