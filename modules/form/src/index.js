/* globals Marionette */
'use strict';

var child = Marionette.ItemView.extend({
  template: require('./childTemplate.hbs'),
  events:{
    'click': 'someCheck'
  },
  someCheck(){
    this.clickFunction();
  },
  initialize(options){
    this.clickFunction = options.model.get('onClick');
  }
});

Marionette.Form = Marionette.CompositeView.extend({
  template: require('./template.hbs'),
  className: 'form-message-container mdl-card mdl-shadow--2dp',
  childView: child,
  childViewContainer: '.form-message-container-check',
  onShow(){
    $('.form-message-title').text(this.textLabel);
    
  },
  events:{
    'click .form-message-button': 'clickCheck'
  },
  initialize(options) {
    this.collection = new Backbone.Collection(options.buttons);
    this.textLabel = options.text;
  }

});
