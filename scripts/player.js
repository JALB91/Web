var WebGame = WebGame || {};


player = {

	States: { IDLE: "idle", MOVE: "move", DEAD: "dead" },

	tiles: [],
	state: "idle",

	init: function(name) {

		for (var tileset of tilemap.tilesets) {

			if (tileset.name == "characters") {

				for (var tileIndex = 0; tileIndex < tileset.total; tileIndex++) {

					if (tileset.tileProperties[tileIndex].name == name) {

						console.log(name);

					}

				}

			}

		}
		
	},

};