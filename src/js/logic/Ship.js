// Class to describe the game logic for the ship

var Ship = function(){
};

module.exports = Ship;

Ship.prototype = {
  cargo: [], // trading goods, water, food, etc.
  energy: 0,
  crew: [],
  position: {}, // not sure how to fill this yet
};
