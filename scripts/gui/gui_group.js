var WebGame = WebGame || {};


WebGame.GUIGroup = class GUIGroup extends Phaser.Group
{
	constructor(game)
	{
		super(game);

		this.selected = null;
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

	onKeyDown(event)
	{
		for (var child of this.children)
		{
			child.handleKey(event);
		}
	}

	onKeyUp(event)
	{

	}

	onKeyPressed(event)
	{

	}

	mouseMoveCallback(event)
	{
		let x = this.game.math.floorTo(((event.x - this.game.scale.offset.x) * this.game.scale.scaleFactor.x) / TILE_WIDTH);
		let y = this.game.math.floorTo(((event.y - this.game.scale.offset.y) * this.game.scale.scaleFactor.y) / TILE_HEIGHT);

		let tile = tilemap.getTile(x, y, 'ground_layer');

		if (!tile)
		{
			return;
		}

		if (this.selected && (this.selected.x != tile.x || this.selected.y != tile.y))
		{
			tilemap.removeTile(this.selected.x, this.selected.y, 'ground_layer');
			tilemap.putTile(12, this.selected.x, this.selected.y, 'ground_layer');

			this.selected = tile;
			tilemap.putTile(2, this.selected.x, this.selected.y, 'ground_layer');
		}
		else if (!this.selected)
		{
			this.selected = tile;

			tilemap.removeTile(this.selected.x, this.selected.y, 'ground_layer');
			tilemap.putTile(2, this.selected.x, this.selected.y, 'ground_layer');
		}
	}

	onMouseOut(event)
	{
		if (this.selected)
		{
			tilemap.removeTile(this.selected.x, this.selected.y, 'ground_layer');
			tilemap.putTile(12, this.selected.x, this.selected.y, 'ground_layer');

			this.selected = false;
		}
	}
};
