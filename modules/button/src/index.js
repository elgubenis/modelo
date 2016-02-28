/* globals Marionette */

Marionette.Modelo = Marionette.Modelo || {};

Marionette.Modelo.Button = Marionette.ItemView.extend({
  template: require('./template.hbs'),
  tagName: 'button',
  className: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored',
});
