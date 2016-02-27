/* globals Marionette, Backbone */

import template from './template.hbs';

Marionette.Modelo = Marionette.Modelo || {};

Marionette.Modelo.DrawerView = Marionette.ItemView.extend({
  template,
  initialize() {
    this.model = new Backbone.Model();
    this.model.set('menu', this.options.menu);
    this.model.set('user', this.options.user.attributes);
  },
  onRender() {
  },
});
