var WebGame = WebGame || {};


WebGame.ImageNode = class ImageNode extends Phaser.Image
{
	constructor(game, x, y, key, frame)
	{
		super(game, x, y, key, frame);

		this.elapsedTime = 0;
		this.id = ++WebGame.ImageNode.id;
	}

	equals(node)
	{
		return this.id === node.id;
	}

	update()
	{
		super.update();

		this.elapsedTime += this.game.time.elapsedMS;
	}
};


WebGame.ImageNode.id = 0;