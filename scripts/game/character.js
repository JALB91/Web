var WebGame = WebGame || {};


WebGame.Character = class Character extends WebGame.TileNode
{
	constructor(game, x, y, name, frame)
	{
		super(game, x, y, "characters2", frame);

		this.name = name;

		this.path = null;
		this.pathPos = - 1;
		this.pathLoop = false;

		this.follow = null;

		this.movingTo = null;
		this.targetTime = this.game.rnd.integerInRange(250, 1000);

		this.prevState = States.NONE;
		this.state = States.IDLE;

		this.direction = Directions.DOWN;

		this.enableCursor = false;

		this.tiles = {};
		this.tiles[Directions.UP] = [];																																																																																	
		this.tiles[Directions.DOWN] = [];
		this.tiles[Directions.RIGHT] = []; 
		this.tiles[Directions.LEFT] = [];
		this.tiles[States.DEAD] = [];

		this.z = this.gamePosX();

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

	setPaused(paused)
	{
		if (paused)
		{
			this.prevState = this.state;
			this.state = States.PAUSED;
		}
		else
		{
			this.state = this.prevState;
			this.prevState = States.PAUSED;
		}
	}

	interact(node)
	{
		let pos = node.gamePos().subtract(this.gamePosX(), this.gamePosY());

		if (Math.abs(pos.x) > Math.abs(pos.y))
		{
			if (pos.x > 0)
			{
				node.direction = Directions.LEFT;
			}
			else
			{
				node.direction = Directions.RIGHT;
			}
		}
		else
		{
			if (pos.y > 0)
			{
				node.direction = Directions.UP;
			}
			else
			{
				node.direction = Directions.DOWN;
			}
		}

		node.turn(node.direction);

		return ("interaction between " + this.name + " and " + node.name);
	}

	turn(dir)
	{
		this.direction = dir;
		this.frame = this.tiles[dir][1].tileIndex;
	}

	move(dir)
	{
		if (!dir)
		{
			return false;
		}

		this.direction = dir;

		if (this.state != States.IDLE) 
		{
			return false;
		}

		let x = 0;
		let y = 0;

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

		if (gameManager.canMoveTo(pos))
		{
            this.prevState = this.state;
			this.state = States.BUSY;
			this.movingTo = pos;

			return true;
		}
		else
		{
			this.frame = this.tiles[dir][1].tileIndex;
		}

		return false;
	}

	setPath(path, loop)
	{
		this.path = path;
		this.pathPos = 0;
		this.pathLoop = loop;
	}

	followNode(node)
	{
		if (node)
		{
			this.path = null;
		}

		this.follow = node;
	}

	stopFollow()
	{
		this.follow = null;
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
                this.prevState = this.state;
				this.state = States.DEAD;
				break;
			case Phaser.KeyCode.E:
				gameManager.checkForInteraction(this);
				break;
			case Phaser.KeyCode.I:
				break;
		}
	}

	update()
	{
		super.update();

		if (this.state == States.NONE || this.state == States.PAUSED)
		{
			return;
		}
		if (this.state == States.DEAD)
		{
			this.frame = this.tiles[this.state][0].tileIndex;
		}
		else if (this.state == States.IDLE)
		{
			if (this.follow)
			{
				let dir = WebGame.getDirectionFor(this.gamePos(), this.follow.gamePos());

				this.move(dir);
			}
			else if (this.path && this.path.length > this.pathPos)
			{
				let dir = WebGame.getDirectionFor(this.gamePos(), this.path[this.pathPos]);

				if (this.move(dir))
				{
					this.pathPos++;
				}
			}
			else if (this.path && this.path.length <= this.pathPos)
			{
				if (!this.pathLoop)
				{
					this.path = null;
				}
				else
				{
					this.pathPos = 0;
				}
			}
			else if (this.enableCursor)
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
					this.targetTime = this.game.rnd.integerInRange(250, 10000);
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
				this.z = this.gamePosY();

				if (this.gamePos().equals(this.movingTo))
				{
					this.movingTo = null;
                    this.prevState = this.state;
				    this.state = States.IDLE;
				}
			}
		}
	}
};