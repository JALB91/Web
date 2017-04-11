var WebGame = WebGame || {};

WebGame.preload = function() {};

WebGame.preload.prototype = {

	preload: function() {

		this.load.spritesheet('tiles', 'assets/images/tiles.png', 16, 16);
		this.load.tilemap('lvl1', 'assets/tilemaps/lvl1.json', null, Phaser.Tilemap.TILED_JSON);

	},

	create: function() {

    	this.game.state.start('lvl1');

	},

};