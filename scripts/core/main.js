var WebGame = WebGame || {};

window.onload = function()
{
	WebGame.game = new Phaser.Game(WORLD_WIDTH, WORLD_HEIGHT, Phaser.AUTO, '');

	WebGame.game.state.add('preload', WebGame.preload);
	WebGame.game.state.add('core', WebGame.core);

	WebGame.game.state.start('preload');
};