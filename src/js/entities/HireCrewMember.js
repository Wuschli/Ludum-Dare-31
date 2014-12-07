var HireCrewMember = function(game, crewMember) {
  Phaser.Group.call(this, game);

  this.crewMember = crewMember;
  var portrait = this.crewMember.portrait || 'unknown_portrait';
  this.portrait = this.create(0, 0, portrait);

  this.portraitButton = this.game.add.button(0, 0, 'button_portrait', function() {
    if (this.game.gameWorld.ship.crew.length >= 6){
      return;
    }
    var index = this.game.gameWorld.ship.target.availableCrew.indexOf(this.crewMember);
    if (index < 0){
      return;
    }
    this.game.gameWorld.ship.target.availableCrew.splice(index, 1);
    this.game.gameWorld.ship.crew.push(this.crewMember);
    this.crewMember.ship = this.game.gameWorld.ship
  }, this, 1, 0, 2, 1, this);

  this.portraitButton.onInputOver.add(function(){
    this.game.tooltip.show(this.getInfoText());
  }, this);
  this.portraitButton.onInputOut.add(function(){
    this.game.tooltip.hide();
  }, this);
};

module.exports = HireCrewMember;

HireCrewMember.prototype = Object.create(Phaser.Group.prototype);
HireCrewMember.prototype.constructor = HireCrewMember;

HireCrewMember.prototype.getInfoText = function() {
  var lines = [
    'hire',
    this.game.config.crewClasses[this.crewMember.class].display_name + ' ' + this.crewMember.name,
    this.crewMember.getAge() + ' years old',
    this.crewMember.salary + 'Cr per ' + this.crewMember.salaryPeriod + ' days'
  ];

  return lines.join('\n');
};

HireCrewMember.prototype.update = function() {

};
