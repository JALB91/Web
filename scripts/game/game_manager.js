var WebGame = WebGame || {};


WebGame.GameManager = class GameManager
{
	constructor(game)
	{
		this.game = game;
		this.paused = false;

    	this.game.input.keyboard.addCallbacks(this, this.onKeyDown, this.onKeyUp, this.onKeyPressed);
    	this.game.input.mouse.mouseMoveCallback = this.mouseMoveCallback;
    	this.game.input.mouse.onMouseOut = this.onMouseOut;

    	this.game.input.onTap.add(this.onTap, this);
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

			nodeB.followNode(nodeA);

			if (text)
			{
				guiGroup.showDialog(text);
				gameGroup.setPaused(true);
			}
		}
	}

	onDialogDismiss()
	{
		gameGroup.setPaused(false);
	}

	onKeyDown(event)
	{
		if (event.keyCode == Phaser.KeyCode.SPACEBAR && this.paused == gameGroup.paused)
		{
			this.paused = !this.paused;
			gameGroup.setPaused(this.paused);
		}

		if (!gameGroup.paused)
		{
			gameGroup.onKeyDown(event);
		}

		guiGroup.onKeyDown(event);
	}

	onKeyUp(event)
	{

	}

	onKeyPressed(event)
	{
		
	}

	mouseMoveCallback(event)
	{
        guiGroup.mouseMoveCallback(event);
	}

	onTap(pointer, doubleTap)
	{
		if (guiGroup.selected)
		{
			player.setPath(WebGame.Path.getPathFor(new Phaser.Point(guiGroup.selected.x, guiGroup.selected.y),
													player.gamePos()), false);
		}
	}

	onMouseOut(event)
	{
		guiGroup.onMouseOut(event);
	}
};
