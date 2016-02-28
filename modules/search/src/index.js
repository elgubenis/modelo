/* globals Marionette */
'use strict';


Marionette.search = Marionette.LayoutView.extend({
  template: require('./template.hbs'),
  className: 'form-message-container',
  regions:{
    title: '#title',
    search: '#search'

  },
  events:{
    'click .form-message-button': 'clickCheck'
  },
  initialize(options) {
    this.viewCheck = options.checkCall;
  },
  clickCheck(){
    this.viewCheck();
  }

});
