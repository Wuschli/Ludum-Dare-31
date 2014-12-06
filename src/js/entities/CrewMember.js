var CrewMember = function(game, crewMember) {
  Phaser.Group.call(this, game);

  var portrait = crewMember.portrait || 'unknown_portrait';
  this.portrait = this.create(0, 0, portrait);
  this.portrait.anchor.x = 1;
  this.infoBackground = this.create(-this.portrait.width, 4, 'crew_member_info_background');
  this.infoBackground.anchor.x = 1;

  var lines = [
    crewMember.name,
    crewMember.getAge() + ' years old',
  ];

  var status = [];
  if (crewMember.hunger >= 0.8){
    status.push((crewMember.hunger >= 1.8 ? 'very ': '') + 'hungry' )
  }
  if (crewMember.thirst >= 0.8){
    status.push((crewMember.thirst >= 1.8 ? 'very ': '') + 'thirsty' )
  }

  lines.push(status.join(', '));
  var infoText = lines.join('\n');

  this.nameLabel = this.game.add.text(-this.portrait.width - 8, 8, infoText, {
    font: '22px VT323',
    fill: '#ffffff',
    align: 'right'
  }, this);
  this.nameLabel.anchor.x = 1;
};

module.exports = CrewMember;

CrewMember.prototype = Object.create(Phaser.Group.prototype);
CrewMember.prototype.constructor = CrewMember;
