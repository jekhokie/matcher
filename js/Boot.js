var Matcher = Matcher || {};
Matcher.Boot = function(){};
 
Matcher.Boot.prototype = {
    create: function() {
        // default background color
        this.game.stage.backgroundColor = '#ffffff';
 
        // screen sizing and alignment
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize(true);
 
        // move into the main menu
        this.state.start('MainMenu');
    }
};
