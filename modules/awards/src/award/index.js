var Award = Marionette.ItemView.extend({
  template: require('./templates/award.hbs'),
  className: 'mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--2-col-phone award'
});

module.exports = Award;