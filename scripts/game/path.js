var WebGame = WebGame || {};


WebGame.Path = class Path
{
	static getPathFor(start, end)
	{
		if (start.equals(end))
		{
			return null;
		}

		let cameFrom = new Map()
		cameFrom.set(start.toKey(), null);

		let frontier = [ start ];

		while (frontier.length > 0)
		{
			let current = frontier.shift();

			if (current.equals(end))
			{
				break;
			}

			for (let next of gameGroup.neighbours(current))
			{
				if (!cameFrom.has(next.toKey()))
				{
					frontier.push(next);
					cameFrom.set(next.toKey(), current);
				}
			}
		}

		let current = end;
		let path = [ ];

		while(!current.equals(start))
		{
			current = cameFrom.get(current.toKey());
			path.push(current);
		}

		return path;
	}

	static getSquarePathFrom(pos, lengthX, lengthY)
	{
		if (!lengthX || !lengthY)
		{
			return null;
		}

		let path = [ pos ];

		for (let side = 0; side < 4; side++)
		{
			let x = 0;
			let y = 0;
			let target = 0

			if (side == 0)
			{
				y = - 1;
				target = lengthY;
			}
			else if (side == 1)
			{
				x = 1;
				target = lengthX;
			}
			else if (side == 2)
			{
				y = 1;
				target = lengthY;
			}
			else if (side == 3)
			{
				x = - 1;
				target = lengthX;
			}

			for (let i = 0; i < target; i++)
			{
				let prev = path[path.length - 1];

				path.push(new Phaser.Point(prev.x + x, prev.y + y));
			}
		}

		return path;
	}
}