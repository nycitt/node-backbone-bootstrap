var tpl = require('../templates/home.hbs');

module.exports = Backbone.View.extend({
	render: function (state) {
		if (!state) state = 'loaded';

		//put other possible states here

		this.$el.html(tpl({
			is_loaded: state === 'loaded'
		}));

		//jQuery stuff goes here
		
		return this;
	}
});