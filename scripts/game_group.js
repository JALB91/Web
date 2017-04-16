var WebGame = WebGame || {};


WebGame.GameGroup = class GameGroup extends Phaser.Group
{
	constructor(game)
	{
		super(game);
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

	handleKey()
	{
		for (var child of this.children)
		{
			if (child.enableCursor)
			{
				child.handleKey(arguments[0]);
			}
		}
	}

	update()
	{
		super.update();
	}
}