var WebGame = WebGame || {};


WebGame.Node = class Node extends Phaser.Sprite
{
	constructor(game, x, y, key, frame)
	{
		super(game, x * TILE_WIDTH, y * TILE_HEIGHT, key, frame);

		this.state = States.NONE;
		this.direction = Directions.DOWN;
		this.enableCursor = false;
		this.elapsedTime = 0;
	}

	handleKey(event)
	{

	}

	gamePos()
	{
		return new Phaser.Point(this.x / TILE_WIDTH, this.y / TILE_HEIGHT);
	}

	gamePosX()
	{
		return this.x / TILE_WIDTH;
	}

	gamePosY()
	{
		return this.y / TILE_HEIGHT;
	}

	update()
	{
		super.update();

		this.elapsedTime += this.game.time.elapsedMS;
	}
};