var History = require('./history/index.js');
/* globals Marionette */

Marionette.HistoryList = Marionette.CollectionView.extend({
  className: 'mdl-grid history-list',
  childView: History
});
