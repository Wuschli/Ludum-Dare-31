var CrewMember = function(game, crewMember) {
  Phaser.Group.call(this, game);

  var portrait = crewMember.portrait || 'unknown_portrait';
  this.portrait = this.create(0, 0, portrait);
  this.portrait.anchor.x = 1;
  this.infoBackground = this.create(-this.portrait.width, 1, 'crew_member_info_background');
  this.infoBackground.anchor.x = 1;
  this.nameLabel = this.game.add.text(-this.portrait.width - 2, 2, crewMember.name, {
    font: '8px TinyPixy',
    fill: '#ffffff',
    align: 'right'
  }, this);
  this.nameLabel.anchor.x = 1;
};

module.exports = CrewMember;

CrewMember.prototype = Object.create(Phaser.Group.prototype);
CrewMember.prototype.constructor = CrewMember;
