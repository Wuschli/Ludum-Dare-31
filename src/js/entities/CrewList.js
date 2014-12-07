var CrewMember = require('./CrewMember');

var CrewList = function(game) {
  Phaser.Group.call(this, game);
  this.elements = [];
};

module.exports = CrewList;

CrewList.prototype = Object.create(Phaser.Group.prototype);
CrewList.prototype.constructor = CrewList;

CrewList.prototype.redraw = function(crew) {
  var yOffset = 0;
  var displayedCrew = [];
  var childrenToDestroy = [];
  
  this.children.forEach(function(child) {
    if (crew.indexOf(child.crewMember) < 0) {
      childrenToDestroy.push(child);
      return;
    }
    displayedCrew.push(child.crewMember);
    child.y = yOffset;
    yOffset += child.height + 8;
    child.update();
  }, this);

  childrenToDestroy.forEach(function(child){
    this.remove(child);
    child.destroy();
  }, this);

  crew.forEach(function(crewMember) {
    if (displayedCrew.indexOf(crewMember) < 0) {
      var child = this.add(new CrewMember(this.game, crewMember));
      displayedCrew.push(crewMember);
      child.y = yOffset;
      yOffset += child.height + 8;
      child.update();
    }
  }, this);
};
