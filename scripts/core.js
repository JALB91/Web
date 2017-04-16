var WebGame = WebGame || {};


var gameManager = new WebGame.GameManager();
var gameGroup;
var guiGroup;
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
        this.paused = false;

		tilemap = this.game.add.tilemap('tilemap');
    	tilemap.addTilesetImage('basic_tiles', 'basic_tiles');
    	tilemap.addTilesetImage('characters2', 'characters2');
    	tilemap.addTilesetImage('things', 'things');

    	this.groundLayer = tilemap.createLayer('ground_layer');
    	this.gameLayer = tilemap.createLayer('game_layer');

    	gameGroup = new WebGame.GameGroup(this.game);
    	gameGroup.classType = WebGame.Character;

    	guiGroup = new WebGame.GUIGroup(this.game);
    	guiGroup.classType = WebGame.Text;

    	player = gameGroup.create(0, 0, "player_1");
    	player.enableCursor = true;

    	gameGroup.create(5, 5, "player_2");
    	gameGroup.create(2, 7, "player_3");
        gameGroup.create(2, 3, "zombie");
        gameGroup.create(4, 8, "ghost");
        gameGroup.create(13, 15, "spider");
    	gameGroup.create(10, 10, "slime");

    	cursor = this.game.input.keyboard.createCursorKeys();
    	this.game.input.keyboard.addCallbacks(this, this.handleKey);
    },

    handleKey: function(event)
    {
        switch(event.keyCode)
        {
            case Phaser.KeyCode.SPACE:
                this.paused = !this.paused;
                break;
        }

        if (!this.paused)
        {
            gameGroup.handleKey(event);
            guiGroup.handleKey(event);
        }
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