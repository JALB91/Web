var WebGame = WebGame || {};


WebGame.GameGroup = class GameGroup extends Phaser.Group
{
	constructor(game)
	{
		super(game);

		this.paused = false;
	}

	setPaused(paused)
	{
		this.paused = paused;
		
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

		let res = [ new Phaser.Point(x + 1, y), new Phaser.Point(x, y + 1), new Phaser.Point(x - 1, y), new Phaser.Point(x, y - 1) ];

		for (let i = 0; i < res.length; i++)
		{
			let node = this.atGamePos(res[i]);

			if (!WebGame.isPosInGame(res[i]) || (node && node.blocking))
			{
				res.splice(i, 1);
				i--;
			}
		}

		if ((x + y) % 2 == 0)
		{
			res.reverse();
		}

		return res;
	}

	onKeyDown(event)
	{
		for (var child of this.children)
		{
			if (child.enableCursor)
			{
				child.handleKey(event);
			}
		}
	}

	onKeyUp(event)
	{

	}

	onKeyPressed(event)
	{

	}

	update()
	{
		super.update();
	}
}