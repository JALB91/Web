var WebGame = WebGame || {};


WebGame.GameManager = class GameManager
{
	constructor()
	{

	}

	checkForInteraction(nodeA)
	{
		let pos = nodeA.gamePos();

		switch(nodeA.direction)
		{
			case Directions.UP:
				pos.y--;
				break;
			case Directions.DOWN:
				pos.y++;
				break;
			case Directions.RIGHT:
				pos.x++;
				break;
			case Directions.LEFT:
				pos.x--;
				break;
		}

		let nodeB = gameGroup.atGamePos(pos);

		if (nodeB && nodeB.state != States.BUSY) 
		{
			let text = nodeA.interact(nodeB);

			if (text)
			{
				guiGroup.showDialog(text);
			}
		}
	}
};