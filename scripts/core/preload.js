var WebGame = WebGame || {};

WebGame.preload = function() {};

WebGame.preload.prototype = {

	preload: function() {

		this.game.load.spritesheet('basic_tiles', 'assets/images/basictiles.png', TILE_WIDTH, TILE_HEIGHT);
		this.game.load.spritesheet('characters2', 'assets/images/characters2.png', TILE_WIDTH, TILE_HEIGHT);
		this.game.load.spritesheet('things', 'assets/images/things.png', TILE_WIDTH, TILE_HEIGHT);
		this.game.load.tilemap('tilemap', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

	},

	create: function() {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

    	this.game.state.start('core');

	},

};