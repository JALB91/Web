var WebGame = WebGame || {};


WebGame.Path = class Path
{
	constructor(start, end)
	{
		this.current = start;
		this.end = end;

		this.cameFrom = new Map()
		this.cameFrom[start] = null;

		let frontier = [ start ];

		while (frontier.lenght > 0)
		{
			let current = frontier.pop()

			if (current.equals(end))
			{
				break;
			}

			for (var next of gameGroup.neighbours(current))
			{
				if (!this.cameFrom.has(next))
				{
					frontier.push(next);
					this.cameFrom[next] = current;
				}
			}
		}
	}
}