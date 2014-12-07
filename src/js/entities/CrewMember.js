var CrewMember = function(game, crewMember) {
  Phaser.Group.call(this, game);

  this.crewMember = crewMember;
  var portrait = crewMember.portrait || 'unknown_portrait';
  this.portrait = this.create(0, 0, portrait);
  this.portrait.anchor.x = 1;
  this.infoBackground = this.create(-this.portrait.width, 4, 'crew_member_info_background');
  this.infoBackground.anchor.x = 1;

  this.portraitButton = this.game.add.button(0, 0, 'button_portrait', function() {
    if (this.class === 'captain') {
      return;
    }
    var index = this.ship.crew.indexOf(this);
    if (index < 0) {
      return;
    }
    this.ship.crew.splice(index, 1);
  }, this.crewMember, 1, 0, 2, 1, this);

  this.portraitButton.onInputOver.add(function() {
    this.game.tooltip.show('Fire');
  }, this);
  this.portraitButton.onInputOut.add(function() {
    this.game.tooltip.hide();
  }, this);

  this.portraitButton.anchor.x = 1;

  this.nameLabel = this.game.add.text(-this.portrait.width - 8, 8, this.getInfoText(), {
    font: '20px VT323',
    fill: '#EBCB96',
    align: 'right'
  }, this);
  this.nameLabel.anchor.x = 1;
};

module.exports = CrewMember;

CrewMember.prototype = Object.create(Phaser.Group.prototype);
CrewMember.prototype.constructor = CrewMember;

CrewMember.prototype.getInfoText = function() {

  var status = [];
  if (this.crewMember.hunger >= 0.8) {
    status.push((this.crewMember.hunger >= 1.8 ? 'very ' : '') + 'hungry')
  }
  if (this.crewMember.thirst >= 0.8) {
    status.push((this.crewMember.thirst >= 1.8 ? 'very ' : '') + 'thirsty')
  }

  var lines = [
    this.game.config.crewClasses[this.crewMember.class].display_name + ' ' + this.crewMember.name + ', ' + this.crewMember.getAge(),
    status.join(', '),
  ];
  if (this.crewMember.class !== 'captain') {
    lines.push(this.crewMember.salary + 'Cr per ' + this.crewMember.salaryPeriod + ' days');
  }

  return lines.join('\n');
};

CrewMember.prototype.update = function() {
  this.nameLabel.setText(this.getInfoText());
};
