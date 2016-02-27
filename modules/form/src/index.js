/* globals Marionette */
'use strict';



Marionette.form = Marionette.ItemView.extend({
  template: require('./template.hbs'),
  className: 'form-message-container',
  onRender() {
    
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
