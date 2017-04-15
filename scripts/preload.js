var WebGame = WebGame || {};

WebGame.preload = function() {};

WebGame.preload.prototype = {

	preload: function() {

		this.load.spritesheet('basic_tiles', 'assets/images/basictiles.png', TILE_WIDTH, TILE_HEIGHT);
		this.load.spritesheet('characters2', 'assets/images/characters2.png', TILE_WIDTH, TILE_HEIGHT);
		this.load.spritesheet('things', 'assets/images/things.png', TILE_WIDTH, TILE_HEIGHT);
		this.load.tilemap('tilemap', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

	},

	create: function() {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

    	this.game.state.start('core');

	},

};