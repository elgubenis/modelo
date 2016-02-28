var Award = require('./award/index.js');

Marionette.Awards = Marionette.CollectionView.extend({
	className: 'mdl-grid awards',
	childView: Award
});
