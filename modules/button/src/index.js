/* globals Marionette, Backbone, _ */


Marionette.Modelo = Marionette.Modelo || {};

import template from './template.hbs';
// import ButtonCollectionView from './collection.js';
// import PrimaryButton from './primary.js';

Marionette.Modelo.Button = Marionette.LayoutView.extend({
  template,
  className: 'mdl-speed-dial mdl-speed-dial--bottom-fixed',

  initialize(options) {
    this.options = options;
    this.model = new Backbone.Model();
    this.model.set(options);
  },

  events: {
    'click #addOrder': 'addOrder',
    'click #addSchedule': 'addSchedule',
  },

  addOrder() {
    const addOrder = this.model.get('addOrder');
    if (_.isFunction(addOrder)) {
      addOrder.call(this);
    }
  },

  addSchedule() {
    const addSchedule = this.model.get('addSchedule');
    if (_.isFunction(addSchedule)) {
      addSchedule.call(this);
    }
  },

});
