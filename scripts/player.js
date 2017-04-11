var WebGame = WebGame || {};

WebGame.player = {

    move: function(dir) {

        var speed_x = 0;
        var speed_y = 0;
        var scale_x = 1;

        switch (dir) {

            case "up":
                speed_y -= 50;
                scale_x = 0.5;
                break;
            case "down":
                speed_y += 50;
                scale_x = - 0.5;
                break;
            case "right":
                speed_x += 50;
                scale_x = 1;
                break;
            case "left":
                speed_x -= 50;
                scale_x = - 1;
                break;

        }

        this.body.velocity.x = speed_x;
        this.body.velocity.y = speed_y;
        this.scale.setTo(scale_x, 1);

        this.animations.play('walk');

    }

};
