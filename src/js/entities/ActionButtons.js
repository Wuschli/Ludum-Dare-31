var ActionButtons = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;

  this.game.add.button(0, 0, 'button', function() {
    switch (this.gameWorld.ship.status){
      case 'landed':
        this.gameWorld.ship.status = 'orbit';
        break;
        case 'orbit':
          this.gameWorld.ship.status = 'landed';
          break;
    }
  }, this, 1, 0, 2, 1, this);

  var label = this.gameWorld.ship.status === 'landed' ? 'start into orbit' : 'land on planet';
  this.buttonLabel = this.game.add.text(0, 0, label, {
    font: '22px VT323',
    fill: '#ffffff',
    align: 'center'
  }, this);


};

module.exports = ActionButtons;

ActionButtons.prototype = Object.create(Phaser.Group.prototype);
ActionButtons.prototype.constructor = ActionButtons;

ActionButtons.prototype.update = function(){
  var label = this.gameWorld.ship.status === 'landed' ? 'start into orbit' : 'land on planet';
  this.buttonLabel.setText(label);
};
