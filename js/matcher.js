// calculated at load time
var QUAD_WIDTH;
var QUAD_HEIGHT;
var points = 0;
var Matcher = Matcher || {};

// initialize the various types of game modes
const GAME_OPTIONS = [ "Numbers", "Letters" ];
const NUMBERS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
const LETTERS = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                  'Y', 'Z' ];

window.onload = function() {
    // calculate the quadrant height and width
    QUAD_WIDTH = window.innerWidth / 3;
    QUAD_HEIGHT = window.innerHeight / 3;

    // picker text offset
    PICKER_OFFSET = 75;

    // initialize the canvas
    Matcher.game = new Phaser.Game(window.innerWidth - 20, window.innerHeight - 20,
                                   Phaser.AUTO, 'game-canvas');
    Matcher.game.state.add('Boot', Matcher.Boot);
    Matcher.game.state.add('MainMenu', Matcher.MainMenu);
    Matcher.game.state.add('Game', Matcher.Game);
    Matcher.game.state.start('MainMenu');
}
