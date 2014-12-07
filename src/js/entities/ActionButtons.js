var ActionButtons = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;
  this.buttons = [{
    labelText: function() {
      switch (this.gameWorld.ship.status) {
        case 'landed':
          return 'start into orbit';
        case 'orbit':
          return 'land on planet';
        case 'space':
          return 'waiting for arrival';
      }
    },
    action: function() {
      switch (this.gameWorld.ship.status) {
        case 'landed':
          this.gameWorld.ship.status = 'orbit';
          break;
        case 'orbit':
          this.gameWorld.ship.status = 'landed';
          break;
      }
    },
  }, {
    labelText: function() {
      return 'increase map scale';
    },
    action: function() {
      this.gameWorld.map.mapScale *= 1 / 2;
    },
  }, {
    labelText: function() {
      return 'decrease map scale';
    },
    action: function() {
      this.gameWorld.map.mapScale *= 2;
    },
  }, {
    labelText: function() {
      if (this.gameWorld.ship.energy >= 1) {
        return 'full tank';
      }
      if (this.gameWorld.ship.status === 'landed') {
        var costs = (this.gameWorld.ship.target.refuelCost * (1 - this.gameWorld.ship.energy)).toFixed(2);
        return 'refuel (' + costs + ' cr)';
      }
      return 'land to refuel';
    },
    action: function() {
      if (this.gameWorld.ship.energy >= 1) {
        return;
      }
      if (this.gameWorld.ship.status === 'landed') {
        var costs = (this.gameWorld.ship.target.refuelCost * (1 - this.gameWorld.ship.energy)).toFixed(2);
        if (this.gameWorld.ship.captain.money >= costs) {
          this.gameWorld.ship.captain.money -= costs;
          this.gameWorld.ship.energy = 1;
        }
      }
    },
  }];

  var yOffset = 0;
  var xOffset = 0;
  var columnLength = 5;
  var i = 0;

  this.buttons.forEach(function(button) {
    button.button = this.game.add.button(xOffset, yOffset, 'button', button.action, this, 1, 0, 2, 1, this);
    button.label = this.game.add.text(0, 0, button.labelText.call(this), {
      font: '22px VT323',
      fill: '#ffffff',
      align: 'center'
    }, this);
    button.label.anchor.x = 0.5;
    button.label.anchor.y = 0.5;
    button.label.x = Math.floor(button.button.x + button.button.width / 2);
    button.label.y = Math.floor(button.button.y + button.button.height / 2);
    button.button.buttonMode = true;

    yOffset += button.button.height + 8;
    ++i;

    if (i % columnLength === 0) {
      yOffset = 0;
      xOffset += button.button.width + 8;
    }
  }, this);
};

module.exports = ActionButtons;

ActionButtons.prototype = Object.create(Phaser.Group.prototype);
ActionButtons.prototype.constructor = ActionButtons;

ActionButtons.prototype.update = function() {
  this.buttons.forEach(function(button) {
    button.label.setText(button.labelText.call(this));
  }, this);
};
