var _ = require('underscore');

module.exports = {
	config: function () {
		var fs =require('fs');

		var CONFIG_FILE = process.env.CONFIG_FILE || './config';

		try {
			this.config = require(CONFIG_FILE);
		} catch (e) {
			function camelToCaps (str) {
				return str.replace(/([A-Z])/g, function($1) {
					return "_" + $1;
				}).toUpperCase();
			}

			var sampleConfig = require('./config.sample.js');
			
			this.config = {};

			_.each(sampleConfig, function (val, moduleKey) {
				if (!_.isObject(val)) {
					this.config[moduleKey] = process.env[camelToCaps(moduleKey)] || val;
					return;
				}

				this.config[moduleKey] = {};

				_.each(val, function (defaultVal, optionKey) {
					this.config[moduleKey][optionKey] = 
						process.env[camelToCaps(moduleKey) + '_' + camelToCaps(optionKey)] || val;
				}, this);
			}, this);
		}
	},

	logging: function () {
		var winston = require('winston');

		this.logger = new (winston.Logger)({
			transports: [
			  new (winston.transports.Console)(),
			  new (winston.transports.File)({
			  	filename: this.config.logFile
			  })
			]
		});
	},

	server: function () {
		var express = require('express');
		var http = require('http');
		var bodyParser = require('body-parser');

		this.app = express()
			.use(express.static(__dirname + '/public'))
			.use(bodyParser.json({

			}));

       	this.server = http
       		.Server(this.app)
       		.listen(this.config.port);
	},

	pushState: function () {
		this.app.get('*', function(req, res){
			res.sendFile(__dirname + '/public/index.html');
		});
	},

	twilio: function () {
		var twilio = require('twilio');
		this.twilioClient = twilio(
			this.config.twilio.accountSid, 
			this.config.twilio.authToken
		);
	},

	socket: function () {
		var socket = require('socket.io');
		var io = socket(this.server);
		
		this.socket = {};

		io.on('connection', _.bind(function (socket) {
		  var uniqueId = _.random(0, 100000000);
		  this.socket[uniqueId] = socket;
		  socket.emit('id', uniqueId);
		}, this));
	},

	mailgun: function () {
		var Mailgun = require('mailgun').Mailgun;
		this.mailgun = new Mailgun(config.mailgunKey);
	},

	localTunnel: function () {
		var localtunnel = require('localtunnel');

		if (!this.config.rootUrl) {
			localtunnel(this.config.port, _.bind(function (err, tunnel) {
				this.config.rootUrl = tunnel.url;
				this.logger.info('LocalTunnel URL: ' + this.config.rootUrl);
			}, this));
		}
	},

	parse: function () {
		var Parse = require('parse/node');
		Parse.initialize(
			this.config.parse.appKey,
			this.config.parse.jsKey,
			this.config.parse.masterKey
		);

		Parse.Cloud.useMasterKey();
	}
};