var StarMap = function(game, gameWorld) {
  Phaser.Group.call(this, game);
  this.gameWorld = gameWorld;

  

};

module.exports = StarMap;

StarMap.prototype = Object.create(Phaser.Group.prototype);
StarMap.prototype.constructor = StarMap;

StarMap.prototype.update = function(){

};
