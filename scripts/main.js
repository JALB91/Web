var WebGame = WebGame || {};

window.onload = function() {

	WebGame.game = new Phaser.Game(160, 160, Phaser.AUTO, '');

	WebGame.game.state.add('boot', WebGame.boot);
	WebGame.game.state.add('preload', WebGame.preload);
	WebGame.game.state.add('lvl1', WebGame.lvl1);

	WebGame.game.state.start('boot');

};