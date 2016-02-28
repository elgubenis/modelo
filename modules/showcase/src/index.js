var Article = require('./article/index.js');
/* globals Marionette */

Marionette.ArticleList = Marionette.CollectionView.extend({
  className: 'mdl-grid',
  childView: Article,
  collectionEvents: {
    'timeout': 'render'
  }
});
