var History = Marionette.ItemView.extend({
  template: require('./templates/history.hbs'),
  className: 'mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone',
  initialize: function() {
  	var createdAt = new Date(this.model.get('createdAt'));
  	var createdAtStr = createdAt.getFullYear()+'/'+createdAt.getMonth()+'/'+createdAt.getDate();
  	this.model.set('createdAtStr', createdAtStr)
  }
});

module.exports = History