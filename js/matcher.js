// calculated at load time
var WIDTH;
var HEIGHT;
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
    // dynamic calculation of window sizing for game board
    WIDTH = window.innerWidth - 20;
    HEIGHT = window.innerHeight - 20;

    // calculate the quadrant height and width
    QUAD_WIDTH = WIDTH / 3;
    QUAD_HEIGHT = HEIGHT / 3;

    // picker text offset
    PICKER_OFFSET = 75;

    // initialize the canvas
    Matcher.game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game-canvas');
    Matcher.game.state.add('Boot', Matcher.Boot);
    Matcher.game.state.add('MainMenu', Matcher.MainMenu);
    Matcher.game.state.add('Game', Matcher.Game);
    Matcher.game.state.start('MainMenu');
}
