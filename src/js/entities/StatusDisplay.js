var moment = require('moment');

var StatusDisplay = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;
  this.timeLabel = this.game.add.text(-2, 2, 'Day ' + moment.duration(this.gameWorld.worldTime).asDays(), {
    font: '8px TinyPixy',
    fill: '#ffffff',
    align: 'center'
  }, this);
};

module.exports = StatusDisplay;

StatusDisplay.prototype = Object.create(Phaser.Group.prototype);
StatusDisplay.prototype.constructor = StatusDisplay;

StatusDisplay.prototype.update = function(){
  console.log('Day ' + moment.duration(this.gameWorld.worldTime).asDays());
  this.timeLabel.setText('Day ' + moment.duration(this.gameWorld.worldTime).asDays());
};
