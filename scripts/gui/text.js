var WebGame = WebGame || {};


WebGame.Text = class Text extends Phaser.Text
{
	constructor(game, x, y, text)
	{
		super(game, x, y, "", { fontSize: 10, stroke: 'red', strokeThickness: 1 });

		this.toDisplay = text;
		this.displayed = "";
		this.speed = 20;
		this.timeElapsed = 0;
		this.timeForNext = 100;
	}

	handleKey(event)
	{
		if (event.keyCode == Phaser.KeyCode.ENTER)
		{
			if (this.toDisplay === this.displayed)
			{
				guiGroup.remove(this, true);
				gameManager.onDialogDismiss();
			}
			else
			{
				this.speed = 40;
			}
		}
	}

	update()
	{
		super.update();

		this.timeElapsed += this.speed;

		if (this.timeElapsed >= this.timeForNext)
		{
			this.timeElapsed = 0;
		}
		else
		{
			return;
		}

		if (this.toDisplay !== this.displayed)
		{
			this.displayed += this.toDisplay[this.displayed.length];
			this.text = this.displayed;
		}
	}
};