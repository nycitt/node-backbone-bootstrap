var HomeView = require('./views/home');

module.exports = Backbone.Router.extend({
	routes: {
		'': function () {
			appendView(new HomeView().render());
		}
	}
});

function appendView(view) {
	$('.main')
		.empty()
		.append(view.$el);
}