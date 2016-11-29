var Matcher = Matcher || {};

Matcher.MainMenu = function(){};
Matcher.MainMenu.prototype = {
    // create the game board
    create: function() {
        this.game.forceSingleUpdate = true;
        this.game.renderer.renderSession.roundPixels = true;

        var text;
        var menuStyle = { fill: "#ffffff", align: "left" };

        // menu background color
        this.game.stage.backgroundColor = '#0a6880';

        // matcher game title
        text = this.game.add.text(this.game.width/2, 50,
                                  "Matcher!",
                                  { font: "6em Arial", fill: "#ffffff", align: "center" });
        text.anchor.set(0.5);

        // menu options
        text = this.game.add.text(this.game.width/2, 150, "Select your Game Mode:", menuStyle);
        text.anchor.set(0.5);
        text.resolution = 1;
        for (var i = 0; i < GAME_OPTIONS.length; i++) {
            text = this.game.add.text(this.game.width/2, (200 + (i * 50)), ((i + 1) + ". " + GAME_OPTIONS[i]), menuStyle);
            text.resolution = 1;
            text.anchor.set(0.5);
            text.inputEnabled = true;
            text.input.useHandCursor = true;
            text.events.onInputDown.add(this.playGame, this);
        }
    },

    // determine which game was selected and play that game
    playGame: function(gameOption) {
        this.game.state.start('Game', true, false, gameOption.text);
    }
};
