var WebGame = WebGame || {};


WebGame.Character = class Character extends WebGame.Node
{
	constructor(game, x, y, name, frame)
	{
		super(game, x, y, "characters2", frame);

		this.name = name;
		this.movingTo = null;
		this.targetTime = this.game.rnd.integerInRange(250, 1000);

		this.state = States.IDLE;
		this.direction = Directions.DOWN;

		this.tiles = {};
		this.tiles[Directions.UP] = [];																																																																																	
		this.tiles[Directions.DOWN] = [];
		this.tiles[Directions.RIGHT] = []; 
		this.tiles[Directions.LEFT] = [];
		this.tiles[States.DEAD] = [];

		this.init();
	}

	init()
	{
		for (var tileset of tilemap.tilesets)
		{
			if (tileset.name == "characters2")
			{
				for (var tileIndex in tileset.tileProperties)
				{
					var tile = tileset.tileProperties[tileIndex];
					tile.tileIndex = parseInt(tileIndex);

					if (tile.name == this.name)
					{
						if (tile.hasOwnProperty('direction'))
						{
							this.tiles[tile.direction].push(tile);
						}
						else
						{
							this.tiles[States.DEAD].push(tile);
						}
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

	handleKey(event)
	{
		if (this.state != States.IDLE)
		{
			return;
		}

		switch(event.keyCode)
		{
			case Phaser.KeyCode.K:
				this.state = States.DEAD;
				break;
			case Phaser.KeyCode.E:
				break;
			case Phaser.KeyCode.I:
				break;
		}
	}

	move(dir)
	{
		this.direction = dir;

		if (this.state != States.IDLE) 
		{
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

		let pos = new Phaser.Point(this.gamePos().x + x, this.gamePos().y + y);

		if (WebGame.isPosInGame(pos) && !gameGroup.atGamePos(pos))
		{
			this.state = States.BUSY;
			this.movingTo = pos;
		}
		else
		{
			this.frame = this.tiles[dir][1].tileIndex;
		}
	}

	update()
	{
		super.update();

		if (this.state == States.DEAD)
		{
			this.frame = this.tiles[this.state][0].tileIndex;
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
				if (this.elapsedTime > this.targetTime)
				{
					let num = this.game.rnd.integerInRange(0, 100);
					let dir;

					if (num < 25)
					{
						dir = Directions.UP;
					}
					else if (num < 50)
					{
						dir = Directions.DOWN;
					}
					else if (num < 75)
					{
						dir = Directions.RIGHT;
					}
					else
					{
						dir = Directions.LEFT;
					}

					this.move(dir);
					this.elapsedTime = 0;
					this.targetTime = this.game.rnd.integerInRange(250, 1000);
				}
				else
				{
					this.frame = this.tiles[this.direction][1].tileIndex;
				}
			}
		}
		else if (this.movingTo)
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

				if (this.gamePos().equals(this.movingTo))
				{
					this.movingTo = null;
				}
			}
		}
	}
};