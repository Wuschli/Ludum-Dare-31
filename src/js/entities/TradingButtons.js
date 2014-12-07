var TradingButtons = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;

  this.buttons = [];
  var yOffset = 0;
  var xOffset = 0;
  var columnLength = 4;

  for (var goodName in this.game.config.tradingGoods) {
    var button = {};
    var good = this.game.config.tradingGoods[goodName];
    button.good = good;
    button.goodName = goodName;
    button.ship = this.gameWorld.ship;
    button.tooltip = this.game.tooltip;

    button.buyAction = function() {
      // console.log('buy ' + this.good.unit + ' of ' + this.goodName);
      var amount = Math.min(this.good.unit, this.ship.target.trading[this.goodName].count);
      if (this.ship.captain.money < this.ship.target.trading[this.goodName].price * amount) {
        return;
      }
      this.ship.target.trading[this.goodName].count -= amount;
      this.ship.cargo[this.goodName] = this.ship.cargo[this.goodName] || {
        count: 0,
        type: this.good.type
      };
      this.ship.cargo[this.goodName].count += amount;
      this.ship.captain.money -= this.ship.target.trading[this.goodName].price * amount;
    };
    button.sellAction = function() {
      // console.log('sell ' + this.good.unit + ' of ' + this.goodName);
      var amount = Math.min(this.good.unit, this.ship.cargo[this.goodName].count);
      this.ship.target.trading[this.goodName].count += amount;
      this.ship.cargo[this.goodName].count -= amount;
      this.ship.captain.money += this.ship.target.trading[this.goodName].price * amount;
    };

    //buy button
    button.buyButton = this.game.add.button(xOffset, yOffset, 'button_small', button.buyAction, button, 1, 0, 2, 1, this);
    button.buyButtonIcon = this.game.add.image(xOffset, yOffset, good.icon, 0, this);
    button.buyButtonPlusIcon = this.game.add.image(xOffset, yOffset, 'icon_plus', 0, this);
    button.buyButton.buttonMode = true;
    button.buyButton.onInputOver.add(function() {
      this.tooltip.show(function() {
        var lines = [
          'buy',
          'amount: ' + this.ship.target.trading[this.goodName].count.toFixed(2),
          'price: ' + this.ship.target.trading[this.goodName].price.toFixed(2) + 'Cr per ' + this.good.unit + ' units'
        ];
        return lines.join('\n');
      }, this);
    }, button);
    button.buyButton.onInputOut.add(function() {
      this.tooltip.hide();
    }, button);

    //sell button
    button.sellButton = this.game.add.button(xOffset + button.buyButton.width + 8, yOffset, 'button_small', button.sellAction, button, 1, 0, 2, 1, this);
    button.sellButtonIcon = this.game.add.image(xOffset + button.buyButton.width + 8, yOffset, good.icon, 0, this);
    button.sellButtonMinusIcon = this.game.add.image(xOffset + button.buyButton.width + 8, yOffset, 'icon_minus', 0, this);
    button.sellButton.buttonMode = true;
    button.sellButton.onInputOver.add(function() {
      this.tooltip.show(function() {
        var lines = [
          'sell',
          'amount: ' + this.ship.cargo[this.goodName].count.toFixed(2),
          'price: ' + this.ship.target.trading[this.goodName].price.toFixed(2) + 'Cr per ' + this.good.unit + ' units'
        ];
        return lines.join('\n');
      }, this);
    }, button);
    button.sellButton.onInputOut.add(function() {
      this.tooltip.hide();
    }, button);

    this.buttons.push(button);
    yOffset += button.buyButton.height + 8;
    if (this.buttons.length % columnLength === 0) {
      yOffset = 0;
      xOffset += (button.buyButton.width + 8) * 2;
    }
  }
};

module.exports = TradingButtons;

TradingButtons.prototype = Object.create(Phaser.Group.prototype);
TradingButtons.prototype.constructor = TradingButtons;

TradingButtons.prototype.update = function() {
  this.visible = (this.gameWorld.ship.status === 'landed');
  if (!this.visible) {
    return;
  }
  this.buttons.forEach(function(button) {
    var onShip = this.gameWorld.ship.cargo[button.goodName] && this.gameWorld.ship.cargo[button.goodName].count > 0;
    button.sellButton.visible = onShip;
    button.sellButtonIcon.visible = onShip;
    button.sellButtonMinusIcon.visible = onShip;

    var onPlanet = this.gameWorld.ship.target.trading[button.goodName] && this.gameWorld.ship.target.trading[button.goodName].count > 0;

    button.buyButton.visible = onPlanet;
    button.buyButtonIcon.visible = onPlanet;
    button.buyButtonPlusIcon.visible = onPlanet;
  }, this);
};
