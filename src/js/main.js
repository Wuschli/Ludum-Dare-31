'use strict';

var width = window.innerWidth;
var height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'ludum-dare-31-game');

window.Utils = require('./utils');

game.state.add('Boot', require('./states/boot'));
game.state.add('Splash', require('./states/splash'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Menu', require('./states/menu'));
game.state.add('Game', require('./states/game'));

game.state.start('Boot');
