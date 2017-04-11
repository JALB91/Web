var WebGame = WebGame || {};

WebGame.lvl1 = function() {};

WebGame.lvl1.prototype = {

	preload: function() {



	},

	create: function() {

		this.map = this.game.add.tilemap('lvl1');
    	this.map.addTilesetImage('tiles', 'tiles');

    	this.bgLayer = this.map.createLayer('bgLayer');
    	this.blLayer = this.map.createLayer('blLayer');

    	this.bgLayer.resizeWorld();
    	this.blLayer.enableBody = true;
    	this.map.setCollisionBetween(1, 100000, true, 'blLayer');

    	this.gameObj = this.game.add.group();
    	this.gameObj.enableBody = true;

    	this.map.objects['objLayer'].forEach(function(elem) {

    		var sprite = this.gameObj.create(elem.x + this.map.tileWidth * 0.5, elem.y - this.map.tileHeight, 'tiles');
    		sprite.frame = elem.gid - 1;
    		sprite.type = elem.type;
    		sprite.name = elem.name;
    		sprite.anchor.setTo(0.5, 0.5);
    		sprite.body.collideWorldBounds = true;
    		sprite.body.immovable = elem.properties['immovable'];

    		if (sprite.type === "player") {

                WebGame.player.assign(sprite);
                this.player = WebGame.player;
    			this.player.animations.add('walk', [ this.player.frame, this.player.frame + 1 ], 6);

    		}

    	}, this);

    	this.cursor = this.game.input.keyboard.createCursorKeys();

	},

	update: function() {

		this.game.physics.arcade.collide(this.player, this.blLayer);
    	this.game.physics.arcade.collide(this.player, this.gameObj);

		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (this.cursor.up.isDown) {

            this.player.move("up");
			/*
            this.player.body.velocity.y -= 50;
			this.player.scale.setTo(0.75, 1);

			if (this.player.animations.currentAnim.name !== 'walk' ||
				!this.player.animations.currentAnim.isPlaying) {

				this.player.animations.play('walk');

			}
            */

		}
		else if (this.cursor.down.isDown) {

			/*
            this.player.body.velocity.y += 50;
			this.player.scale.setTo(- 0.75, 1);

			if (this.player.animations.currentAnim.name !== 'walk' ||
				!this.player.animations.currentAnim.isPlaying) {

				this.player.animations.play('walk');

			}
            */

		}
		else if (this.cursor.right.isDown) {

			/*
            this.player.body.velocity.x += 50;
			this.player.scale.setTo(1, 1);

			if (this.player.animations.currentAnim.name !== 'walk' ||
				!this.player.animations.currentAnim.isPlaying) {

				this.player.animations.play('walk');

			}
            */

		}
		else if (this.cursor.left.isDown) {

			/*
            this.player.body.velocity.x -= 50;
			this.player.scale.setTo(- 1, 1);

			if (this.player.animations.currentAnim.name !== 'walk' ||
				!this.player.animations.currentAnim.isPlaying) {

				this.player.animations.play('walk');

			}
            */

		}
		else if (this.player.animations.currentAnim.name === 'walk') {

            //this.player.animations.stop('walk', true);

		}

	},

};
