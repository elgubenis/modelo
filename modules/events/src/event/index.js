var Event = Marionette.ItemView.extend({
  template: require('./templates/event.hbs'),
  className: 'mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone',
});

module.exports = Event