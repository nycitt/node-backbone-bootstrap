var $ = require('jquery');
var _ = require('underscore');

require('backbone');
require('bootstrap/dist/css/bootstrap.css');

var config = require('./config');
var Router = require('./router');

var containerTpl = require('./templates/container.hbs');

var app = {
	init: function () {
		$('body').append(containerTpl({
			site_name: 'Your Site Name',
			routes: [{
				url: '/',
				name: 'Home'
			}],
			footer: '(c) 2015 Your Name'
		}));

		this.router = new Router();
		
		Backbone.history.start({
			pushState: true
		});
	}
};

$(function () {
	app.init();
});