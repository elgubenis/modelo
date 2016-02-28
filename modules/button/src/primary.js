/* globals Marionette, _, Backbone */

import template from './primary.hbs';

export default Marionette.ItemView.extend({
  template,
  className: 'mdl-speed-dial__main-fab mdl-speed-dial__main-fab--spin mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored',
  events: {
    click: '_doCallback',
  },

  initialize() {
    this.model = new Backbone.Model();
    this.model.set(this.options);
  },

  _doCallback() {
    const cb = this.model.get('onClick');
    if (_.isFunction(cb)) {
      cb.call(this);
    }
  },
});
