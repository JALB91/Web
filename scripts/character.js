var WebGame = WebGame || {};


WebGame.Character = class Character extends WebGame.Node
{
	constructor(game, x, y, name, frame)
	{
		super(game, x, y, "characters", frame);

		this.enableCursor = false;

		this.name = name;

		this.state = States.IDLE;
		this.direction = Directions.DOWN;

		this.tiles = {};
		this.tiles[Directions.UP] = [];																																																																																	
		this.tiles[Directions.DOWN] = [];
		this.tiles[Directions.RIGHT] = []; 
		this.tiles[Directions.LEFT] = [];

		this.init();
	}

	init()
	{
		for (var tileset of tilemap.tilesets)
		{
			if (tileset.name == "characters")
			{
				for (var tileIndex in tileset.tileProperties)
				{
					var tile = tileset.tileProperties[tileIndex];
					tile.tileIndex = parseInt(tileIndex);

					if (tile.name == this.name)
					{
						this.tiles[tile.direction].push(tile);
					}
				}
			}
		}

		this.frame = this.tiles[this.direction][1].tileIndex;

		for (var dir in Directions)
		{
			var anim = [];

			for (var i = 0; i < 3; i++)
			{
				anim.push(this.tiles[Directions[dir]][i].tileIndex);
			}

			this.animations.add(Directions[dir], anim, 10);
		}
	}

	update()
	{
		super.update();

		if (this.state == States.DEAD)
		{

		}
		else if (this.state == States.IDLE)
		{
			if (this.enableCursor)
			{
				if (cursor.up.isDown)
				{
					this.move(Directions.UP);
				}
				else if (cursor.down.isDown)
				{
					this.move(Directions.DOWN);
				}
				else if (cursor.right.isDown)
				{
					this.move(Directions.RIGHT);
				}
				else if (cursor.left.isDown)
				{
					this.move(Directions.LEFT);
				}
				else
				{
					this.frame = this.tiles[this.direction][1].tileIndex;
				}
			}
			else
			{
				this.frame = this.tiles[this.direction][1].tileIndex;
			}
		}
		else if (this.state == States.MOVE)
		{
			if (this.direction == Directions.UP)
			{
				this.y--;
			}
			else if (this.direction == Directions.DOWN)
			{
				this.y++;
			}
			else if (this.direction == Directions.RIGHT)
			{
				this.x++;
			}
			else if (this.direction == Directions.LEFT)
			{
				this.x--;
			}

			this.animations.play(this.direction);

			if (this.x % TILE_WIDTH == 0 && 
				this.y % TILE_HEIGHT == 0)
			{
				this.state = States.IDLE;
			}
		}
	}

	move(dir)
	{
		this.direction = dir;

		if (this.state != States.IDLE) 
		{
			this.frame = this.tiles[dir][1].tileIndex;
			return;
		}

		var x = 0;
		var y = 0;

		switch (dir)
		{
			case Directions.UP:
				y--;
				break;
			case Directions.DOWN:
				y++;
				break;
			case Directions.RIGHT:
				x++;
				break;
			case Directions.LEFT:
				x--;
				break;
		}

		if (WebGame.isPosInGame(new Phaser.Point(this.gamePos().x + x, this.gamePos().y + y)) &&
			!gameGroup.atGamePos(new Phaser.Point(this.gamePos().x + x, this.gamePos().y + y)))
		{
			this.state = States.MOVE;
			this.x += x;
			this.y += y;
		}
		else
		{
			this.frame = this.tiles[dir][1].tileIndex;
		}
	}
};