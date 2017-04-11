var WebGame = WebGame || {};

WebGame.boot = function() {};

WebGame.boot.prototype = {

	preload: function() {

        

	},

	create: function() {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
    	this.scale.pageAlignVertically = true;


    	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	this.game.state.start('preload');

	},

};
