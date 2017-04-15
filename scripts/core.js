var WebGame = WebGame || {};


var gameGroup;
var tilemap;
var player;


WebGame.core = function() {};

WebGame.core.prototype =
{
	preload: function()
	{

	},

	create: function()
	{
		tilemap = this.game.add.tilemap('tilemap');
    	tilemap.addTilesetImage('basic_tiles', 'basic_tiles');
    	tilemap.addTilesetImage('characters2', 'characters2');
    	tilemap.addTilesetImage('things', 'things');

    	this.groundLayer = tilemap.createLayer('ground_layer');
    	this.gameLayer = tilemap.createLayer('game_layer');

    	gameGroup = new WebGame.GameGroup(this.game);
    	gameGroup.classType = WebGame.Character;

    	player = gameGroup.create(0, 0, "player_1");
    	player.enableCursor = true;

    	gameGroup.create(5, 5, "player_2");
    	gameGroup.create(2, 7, "player_3");

    	gameGroup.create(10, 10, "slime");

    	cursor = this.game.input.keyboard.createCursorKeys();
    },

	update: function()
	{
		if (cursor.up.isDown)
		{    

		}
		else if (cursor.down.isDown)
		{	

		}
		else if (cursor.right.isDown)
		{	

		}
		else if (cursor.left.isDown)
		{	

		}
	},
};