var WebGame = WebGame || {};


WebGame.GameManager = class GameManager
{
	constructor(game)
	{
		this.game = game;
		this.paused = false;

    	this.game.input.keyboard.addCallbacks(this, this.handleKeyDown, this.handleKeyUp, this.handleKeyPressed);
    	this.game.input.mouse.onMouseOver = this.onMouseOver;
	}

	handleKeyDown(event)
	{
		if (event.keyCode == Phaser.KeyCode.SPACEBAR)
		{
			this.paused = !this.paused;
			gameGroup.setPaused(this.paused);
		}

		if (!this.paused)
		{
			gameGroup.handleKey(event);
		}

		guiGroup.handleKey(event);
	}

	handleKeyUp(event)
	{

	}

	handleKeyPressed(event)
	{
		
	}

	onMouseOver(event)
	{
		
	}
    
    canMoveTo(pos)
    {
        return (WebGame.isPosInGame(pos) && !gameGroup.atGamePos(pos));
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