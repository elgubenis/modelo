/* globals Marionette, Backbone */

import template from './template.hbs';

Marionette.Modelo = Marionette.Modelo || {};

Marionette.Modelo.ConfirmationView = Marionette.ItemView.extend({
  initialize() {
    this.model = new Backbone.Model();
    this.model.set(this.options);
    console.log(this.model);
  },
  onRender() {
  },
  template,
});
