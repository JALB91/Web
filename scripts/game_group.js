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
			if (p.equals(child.gamePos()))
			{
				return child;
			}
		}

		return null;
	}
}