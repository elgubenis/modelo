var Article = require('./article/index.js');
/* globals Marionette */

Marionette.ArticleList = Marionette.CollectionView.extend({
  className: 'mdl-grid',
  childView: Article,
  initialize: function(options) {
  	this.collection.discount = options.discount;
  }
});
