var Button = function(game) {
  Phaser.Group.call(this, game);



};

module.exports = Button;

Button.prototype = Object.create(Phaser.Group.prototype);
Button.prototype.constructor = Button;

Button.prototype.update = function(){

};
