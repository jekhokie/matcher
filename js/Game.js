var Matcher = Matcher || {};
var gameMode;
var options = [];
var optionList = [];
var winner;
var winningCount;
var numFound = 0;

Matcher.Game = function(){};
Matcher.Game.prototype = {
    // initialization for state
    init: function(gameType) {
        this.game.forceSingleUpdate = true;
        this.game.renderer.renderSession.roundPixels = true;
        gameMode = gameType.replace(/[0-9]\.\s/g, '').toLowerCase();

        switch(gameMode) {
            case 'numbers':
                options = NUMBERS;
                break;
            case 'letters':
                options = LETTERS;
                break;
            default:
                alert("Something went wrong - game option '" + gameMode + "' is not recognized");
        }
    },
    
    // create the game board
    create: function() {
        // menu background color
        this.game.stage.backgroundColor = '#cccccc';

        // generate the menu button
        this.genMenuButton();

        // generate the points display
        this.genPointsText();

        // generate the possible options for the round
        this.genOptions();

        // display the chosen options to the screen
        this.displayOptions();

        // generate the menu indicating what to pick
        this.genPickText();
    },

    // generate the 'back to main menu' button and text
    genMenuButton: function() {
        var sq = this.game.add.bitmapData(110, 30);
        sq.ctx.beginPath();
        sq.ctx.rect(0, 0, 110, 30);
        sq.ctx.fillStyle = '#ffffff';
        sq.ctx.fill();
        this.game.add.sprite(5, 8, sq);

        text = this.game.add.text(10, 10, 'Main Menu', { font: "2em Arial", fill: "#000000", align: "left" });
        text.inputEnabled = true;
        text.input.useHandCursor = true;
        text.events.onInputDown.add(this.returnMainMenu, this);
    },

    // generate the points display
    genPointsText: function() {
        text = this.game.add.text(this.game.width - 120, 10, 'Points: ' + points, { font: "2em Arial", fill: "#000000", align: "left" });
    },

    // return to the main menu to select a different game
    returnMainMenu: function() {
        this.resetOptions();
        this.state.start('MainMenu');
    },

    // reset variables for a new/different game
    resetOptions: function() {
        optionList = [];
        numFound = 0;
    },

    // generate a pseudo-random list of options
    genOptions: function() {
        for (var i = 0; i < 9; i++) {
            optionList.push(options[Math.floor(Math.random() * options.length)]);
        }
    },

    // display the chosen options to the screen, which includes action handling
    displayOptions: function() {
        var xLoc, yLoc;
        var pos = 0;
        var yOffset = (this.game.height - PICKER_OFFSET) / 3;

        // figure out which element will be the 'winner'
        winner = optionList[Math.floor(Math.random() * optionList.length)];
        winningCount = optionList.filter(function(value){
            return value === winner;
        }).length

        // start plotting the options in the playing board field
        for (var i = 3; i >= 1; i--) {
            yLoc = 35 + i * (yOffset) - (QUAD_HEIGHT * 0.75);

            for (var j = 3; j >= 1; j--) {
                xLoc = j * (this.game.width / 3) - (QUAD_WIDTH * 0.6);
                text = this.game.add.text(xLoc, yLoc, optionList[pos], { font: "6em Arial", fill: "#000000", align: "left" });
                text.resolution = 1;
                text.inputEnabled = true;
                text.input.useHandCursor = true;
                this.addHandling(text, optionList[pos] === winner);
                pos += 1;
            }
        }
    },

    // set up handling for correct options
    addHandling: function(obj, isWinner) {
        if (isWinner) {
            obj.inputEnabled = true;
            obj.events.onInputDown.add(function(game) {
                // disable clicking again and add to number of occurrences found
                obj.events.onInputDown.removeAll();
                obj.addColor('#999999', 0);
                numFound += 1;

                // check if all occurrences have been found
                if (numFound == winningCount) {
                    // reset the playing field and start a new game
                    obj.game.world.removeAll();
                    points += 1;
                    this.resetOptions();
                    this.create();
                }
            }, this);
        }
    },

    // generate the text indicating to the user what to do
    genPickText: function() {
        var textContent = "Select all the " + winner + "s";
        var text = this.game.add.text((this.game.width / 2), (this.game.height - (PICKER_OFFSET / 2)), textContent, { font: "4em Arial", fill: "#000000", align: "left" });
        text.addColor("#0a6880", 15);
        text.addColor("#000000", textContent.length - 1);
        text.resolution = 1;
        text.anchor.set(0.5);
    }
};
