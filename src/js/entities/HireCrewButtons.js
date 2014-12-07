var HireCrewMember = require('./HireCrewMember');

var HireCrewButtons = function(game) {
  Phaser.Group.call(this, game);
  this.elements = [];
};

module.exports = HireCrewButtons;

HireCrewButtons.prototype = Object.create(Phaser.Group.prototype);
HireCrewButtons.prototype.constructor = HireCrewButtons;

HireCrewButtons.prototype.redraw = function(crew) {

  this.visible = this.game.gameWorld.ship.status === 'landed';
  if (!this.visible){
    return;
  }

  var yOffset = 0;
  var xOffset = 0;
  var displayedCrew = [];
  var childrenToDestroy = [];

  var i = 0;
  var columnLength = 3;

  this.children.forEach(function(child) {
    if (crew.indexOf(child.crewMember) < 0) {
      childrenToDestroy.push(child);
      return;
    }
    displayedCrew.push(child.crewMember);
    child.y = yOffset;
    child.x = xOffset;

    ++i;
    yOffset += child.height + 8;
    if (i % columnLength === 0) {
      yOffset = 0;
      xOffset += child.width + 8;
    }

    child.update();
  }, this);

  childrenToDestroy.forEach(function(child){
    this.remove(child);
    child.destroy();
  }, this);

  crew.forEach(function(crewMember) {
    if (displayedCrew.indexOf(crewMember) < 0) {
      var child = this.add(new HireCrewMember(this.game, crewMember));
      displayedCrew.push(crewMember);
      child.y = yOffset;
      child.x = xOffset;

      ++i;
      yOffset += child.height + 8;
      if (i % columnLength === 0) {
        yOffset = 0;
        xOffset += child.width + 8;
      }
      child.update();
    }
  }, this);
};
