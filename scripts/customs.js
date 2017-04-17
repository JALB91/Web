var WebGame = WebGame || {};


WebGame.isPosInGame = function(pos)
{
	return (pos.x >= 0 && pos.x < MAP_WIDTH && pos.y >= 0 && pos.y < MAP_HEIGHT);
};

WebGame.getDirectionFor = function(start, end)
{
	let x = start.x - end.x;
	let y = start.y - end.y;

	if (x == 1)
	{
		return Directions.RIGHT;
	}
	else if (x == - 1)
	{
		return Directions.LEFT;
	}
	else if (y == - 1)
	{
		return Directions.UP;
	}
	else if (y == 1)
	{
		return Directions.DOWN;
	}

	return null;
}

Phaser.Point.prototype.toGamePos = function()
{
	return Phaser.Point.toGamePos(this);
};

Phaser.Point.prototype.toWorldPos = function()
{
	return Phaser.Point.toWorldPos(this);
};

Phaser.Point.toGamePos = function(p)
{
	return new Phaser.Point(p.x / TILE_WIDTH, p.y / TILE_HEIGHT);
}

Phaser.Point.toWorldPos = function(p)
{
	return new Phaser.Point(this.x * TILE_WIDTH, this.y * TILE_HEIGHT);
}