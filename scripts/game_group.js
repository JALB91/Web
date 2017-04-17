var WebGame = WebGame || {};


WebGame.GameGroup = class GameGroup extends Phaser.Group
{
	constructor(game)
	{
		super(game);
	}

	setPaused(paused)
	{
		for (var child of this.children)
		{
			child.setPaused(paused);
		}
	}

	atGamePos(p)
	{
		for (var child of this.children)
		{
			if ((p.equals(child.gamePos()) && !child.movingTo) || 
				(child.movingTo && p.equals(child.movingTo)))
			{
				return child;
			}
		}

		return null;
	}

	neighbours(pos)
	{
		let x = pos.x;
		let y = pos.y;

		let res = [ new Phaser.Point(x + 1, y), new Phaser.Point(x, y - 1), new Phaser.Point(x - 1, y), new Phaser.Point(x, y + 1) ];

		if ((x + y) % 2 == 0)
		{
			res.reverse();
		}

		for (var neighbour of res)
		{
			if (atGamePos(neighbour) || !WebGame.isPosInGame(neighbour))
			{
				res.slice(res.indexOf(neighbour));
			}
		}

		return res;
	}

	handleKey(event)
	{
		for (var child of this.children)
		{
			if (child.enableCursor)
			{
				child.handleKey(event);
			}
		}
	}

	update()
	{
		super.update();
	}
}