var Event = require('./event/index.js');
/* globals Marionette */

Marionette.EventsList = Marionette.CollectionView.extend({
  className: 'mdl-grid events',
  childView: Event
});
