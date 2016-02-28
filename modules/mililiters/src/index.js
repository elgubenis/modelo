/* globals Marionette, Backbone */
import template from './template.hbs';
Marionette.Modelo = Marionette.Modelo || {};

Marionette.Modelo.Mililiters = Marionette.ItemView.extend({
  template,
  initialize(options) {
    this.model = new Backbone.Model();
    this.model.set(options);
  },
});
