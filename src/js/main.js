'use strict';



var width = '100%';
var height = '100%';

var game = new Phaser.Game(width, height, Phaser.AUTO, 'ludum-dare-31-game');

window.WebFontConfig = {

  //  'active' means all requested fonts have finished loading
  //  We set a 1 second delay before calling 'createText'.
  //  For some reason if we don't the browser cannot render the text the first time it's created.
  active: function() {

    game.time.events.add(Phaser.Timer.SECOND, function() {
      window.fontsLoaded = true;
    }, this);
  },

  //  The Google Fonts we want to load (specify as many as you like in the array)
  google: {
    families: ['VT323']
  }

};


window.Utils = require('./utils');

game.state.add('Boot', require('./states/boot'));
game.state.add('Splash', require('./states/splash'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Menu', require('./states/menu'));
game.state.add('Game', require('./states/game'));
game.state.add('GameOver', require('./states/gameOver'));

game.state.start('Boot');
