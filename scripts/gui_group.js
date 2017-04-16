var WebGame = WebGame || {};


WebGame.GUIGroup = class GUIGroup extends Phaser.Group
{
	constructor(game)
	{
		super(game);
	}

	remove(child, destroy, silent)
	{
		super.remove(child, destroy, silent);
	}

	showDialog(text)
	{
		this.classType = WebGame.Text;

		this.create(10, WORLD_HEIGHT * 0.9, text);
	}

	handleKey(event)
	{
		for (var child of this.children)
		{
			child.handleKey(event);
		}
	}
};