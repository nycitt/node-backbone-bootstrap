var setup = require('./setup');
var _ = require('underscore');

var app = {
	init: function () {
		//comment in the tools you want to use
		var modules = [
			'config',
			'logging',
			'server',
			'socket',
			'localTunnel',
			// 'twilio',
			// 'mailgun',
			// 'parse'
		];

		_.each(modules, function (module) {
			setup[module].call(this);
		}, this);

		// Put after all your this.app.get/post routes
		setup.pushState.call(this);
	},
};

app.init();