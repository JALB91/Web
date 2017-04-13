var WebGame = WebGame || {};

WebGame.preload = function() {};

WebGame.preload.prototype = {

	preload: function() {

		this.load.spritesheet('basic_tiles', 'assets/images/basictiles.png', 16, 16);
		this.load.spritesheet('characters', 'assets/images/characters.png', 16, 16);
		this.load.spritesheet('dead', 'assets/images/dead.png', 16, 16);
		this.load.spritesheet('things', 'assets/images/things.png', 16, 16);
		this.load.tilemap('tilemap', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

	},

	create: function() {

		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

    	this.game.state.start('core');

	},

};