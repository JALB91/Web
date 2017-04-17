var WebGame = WebGame || {};


WebGame.Node = class Node extends Phaser.Sprite
{
	constructor(game, x, y, key, frame)
	{
		super(game, x * TILE_WIDTH, y * TILE_HEIGHT, key, frame);

		this.state = States.NONE;
        this.prevState = States.NONE;
		this.direction = Directions.DOWN;
		this.enableCursor = false;
		this.elapsedTime = 0;

		this.id = ++WebGame.Node.id;
	}

	handleKey(event)
	{

	}

	setPaused(paused)
	{
		if (paused)
		{
			this.prevState = this.state;
			this.state = States.NONE;
		}
		else
		{
			this.state = this.prevState;
		}
	}

	equals(node)
	{
		return this.id === node.id;
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


WebGame.Node.id = 0;