var WebGame = WebGame || {};


WebGame.TileNode = class TileNode extends WebGame.ImageNode
{
	constructor(game, x, y, key, frame)
	{
		super(game, x * TILE_WIDTH, y * TILE_HEIGHT, key, frame);

		this.blocking = false;
	}

	gamePos()
	{
		return new Phaser.Point(Math.floor(this.x / TILE_WIDTH), Math.floor(this.y / TILE_HEIGHT));
	}

	gamePosX()
	{
		return Math.floor(this.x / TILE_WIDTH);
	}

	gamePosY()
	{
		return Math.floor(this.y / TILE_HEIGHT);
	}
};