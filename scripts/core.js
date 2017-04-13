var WebGame = WebGame || {};

var tilemap;
var cursor;

WebGame.core = function() {};

WebGame.core.prototype = {

	preload: function() {



	},

	create: function() {

		tilemap = this.game.add.tilemap('tilemap');
    	tilemap.addTilesetImage('basic_tiles', 'basic_tiles');
    	tilemap.addTilesetImage('characters', 'characters');
    	tilemap.addTilesetImage('dead', 'dead');
    	tilemap.addTilesetImage('things', 'things');

    	this.groundLayer = tilemap.createLayer('ground_layer');
    	this.gameLayer = tilemap.createLayer('game_layer');

    	player.init("player_1");

    	this.gameObj = this.game.add.group();
    	this.gameObj.enableBody = true;

    	cursor = this.game.input.keyboard.createCursorKeys();

    },

	update: function() {

		if (cursor.up.isDown) {

            

		}
		else if (cursor.down.isDown) {

			

		}
		else if (cursor.right.isDown) {

			

		}
		else if (cursor.left.isDown) {

			

		}

	},

};
