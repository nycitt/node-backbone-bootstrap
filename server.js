var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var _ = require('underscore');

var winston = require('winston');

var config;
var logger;

var app = {
	init: function () {
		this.setupConfig();
		this.setupLogging();
		this.setupServer();
	},

	setupConfig: function () { 
		try {
			config = require('./config');
		} catch (e) {
			config = {
				port: process.env.PORT,
				logFile: process.env.LOG_FILE,
			};
		}
	},

	setupLogging: function () {
		logger = new (winston.Logger)({
			transports: [
			  new (winston.transports.Console)(),
			  new (winston.transports.File)({
			  	filename: config.logFile
			  })
			]
		});
	},

	setupServer: function () {
		var app = express()
			.use(express.static(__dirname + '/public'));
       		.use(bodyParser.json());

       	this.server = http
       		.Server(app)
       		.listen(config.port);
	}
};

app.init();