var CrewMember = require('./CrewMember');

var CrewList = function(game) {
  Phaser.Group.call(this, game);
};

module.exports = CrewList;

CrewList.prototype = Object.create(Phaser.Group.prototype);
CrewList.prototype.constructor = CrewList;

CrewList.prototype.redraw = function(crew) {
  this.removeAll();
  var yOffset = 0;
  var self = this;
  crew.forEach(function(crewMember){
    var memberGroup = self.add(new CrewMember(self.game, crewMember));
    memberGroup.y = yOffset;
    yOffset += memberGroup.height + 2;
  });
};
