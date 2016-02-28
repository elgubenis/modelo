/* globals Marionette, Backbone */

import template from './template.hbs';

Marionette.Modelo = Marionette.Modelo || {};

Marionette.Modelo.DrawerView = Marionette.ItemView.extend({
  template,
  initialize() {
    this.model = new Backbone.Model();
    this.model.set('menu', this.options.menu);
    this.model.set('user', this.options.user.attributes);
    this.model.set('mlLink', this.options.mlLink);
    this.model.set('full', this.options.full);
  },
  onRender() {
  },
});
