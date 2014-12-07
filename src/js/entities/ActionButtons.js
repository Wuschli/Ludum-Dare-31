var ActionButtons = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;
  var self = this;
  this.buttons = [{
    labelText: function() {
      return ((self.gameWorld.ship.status === 'landed') ? 'start into orbit' : 'land on planet');
    },
    action: function() {
      switch (this.gameWorld.ship.status) {
        case 'landed':
          self.gameWorld.ship.status = 'orbit';
          break;
        case 'orbit':
          self.gameWorld.ship.status = 'landed';
          break;
      }
    },
  }, {
    labelText: function() {
      return 'increase map scale';
    },
    action: function() {
      self.gameWorld.map.mapScale *= 1/2;
    },
  }, {
    labelText: function() {
      return 'decrease map scale';
    },
    action: function() {
      self.gameWorld.map.mapScale *= 2;
    },
  }];

  var yOffset = 0;
  this.buttons.forEach(function(button) {
    button.button = self.game.add.button(0, yOffset, 'button', button.action, self, 1, 0, 2, 1, self);
    button.label = self.game.add.text(0, 0, button.labelText(), {
      font: '22px VT323',
      fill: '#ffffff',
      align: 'center'
    }, self);
    button.label.anchor.x = 0.5;
    button.label.anchor.y = 0.5;
    button.label.x = Math.floor(button.button.x + button.button.width / 2);
    button.label.y = Math.floor(button.button.y + button.button.height / 2);
    button.button.buttonMode = true;
    yOffset += button.button.height + 8;
  });
};

module.exports = ActionButtons;

ActionButtons.prototype = Object.create(Phaser.Group.prototype);
ActionButtons.prototype.constructor = ActionButtons;

ActionButtons.prototype.update = function() {
  this.buttons.forEach(function(button) {
    button.label.setText(button.labelText());
  });
};
