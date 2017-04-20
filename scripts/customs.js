var WebGame = WebGame || {};


WebGame.isPosInGame = function(pos)
{
	return (pos.x >= 0 && pos.x < MAP_WIDTH && pos.y >= 0 && pos.y < MAP_HEIGHT);
};

WebGame.getDirectionFor = function(start, end)
{
	if (start.x < end.x)
	{
		return Directions.RIGHT;
	}
	else if (start.x > end.x)
	{
		return Directions.LEFT;
	}
	else if (start.y < end.y)
	{
		return Directions.DOWN;
	}
	else if (start.y > end.y)
	{
		return Directions.UP;
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

Phaser.Point.prototype.toKey = function()
{
	return Phaser.Point.toKey(this);
};

Phaser.Point.toGamePos = function(p)
{
	return new Phaser.Point(Math.floor(p.x / TILE_WIDTH), Math.floor(p.y / TILE_HEIGHT));
};

Phaser.Point.toWorldPos = function(p)
{
	return new Phaser.Point(p.x * TILE_WIDTH, p.y * TILE_HEIGHT);
};

Phaser.Point.toKey = function(p)
{
	return p.x.toString() + " " + p.y.toString();
}