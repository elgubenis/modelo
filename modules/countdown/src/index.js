Marionette.Countdown = Marionette.ItemView.extend({
	template: require('./templates/countdown.hbs'),
	className: 'countdown',
	initialize: function(options) {
		this.duration = options.duration;
	},
	onShow: function() {
    	this.startTimer(this.duration, this.$el);
	},
	startTimer: function(duration, display) {
		var timer = duration, minutes, seconds, self;
		self = this;
	    setInterval(function () {
	        minutes = parseInt(timer / 60, 10);
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        display.text(minutes + ":" + seconds);

	        if (--timer < 0) {
	            self.destroy()
	        }
	    }, 1000);
	}


});
