var WebGame = WebGame || {};


var map;
var gameGroup;
var tilemap;
var cursor;
var player;
var enemy;


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
    	tilemap.addTilesetImage('characters', 'characters');
    	tilemap.addTilesetImage('dead', 'dead');
    	tilemap.addTilesetImage('things', 'things');

    	this.groundLayer = tilemap.createLayer('ground_layer');
    	this.gameLayer = tilemap.createLayer('game_layer');

    	//map = new WebGame.Map();

    	gameGroup = new WebGame.GameGroup(this.game);
    	gameGroup.classType = WebGame.Character;

    	player = gameGroup.create(0, 0, "player_1");
    	player.enableCursor = true;

    	enemy = gameGroup.create(10, 10, "slime");

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
