Marionette.ShowTotal = Marionette.ItemView.extend({
	template: require('./templates/show-total.hbs'),
	className: 'show-total',
	initialize: function(options) {
		this.total = options.total;
	},
	serializeData: function() {
		return {
			total: this.total
		};
	},
	onShow: function() {
		var self = this;
		this.$el.addClass('tada animated');
		setTimeout(function(){
			self.$el
			.addClass('fadeOut');
		}, 1100);
		setTimeout(function(){
			self.destroy();
		}, 1600);
	}

});
