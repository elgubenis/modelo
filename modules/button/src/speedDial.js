/* globals Marionette, _ */

import template from 'optionButton.hbs';

export default Marionette.ItemView.extend({
  template,
  className: 'mdl-speed-dial__option',
  events: {
    click: '_doCallback',
  },

  onShow() {
    _.defer(() => {
      const old = this.$el.parent().html();
      this.$el.parent().parent().html(old);
    });
  },

  _doCallback() {
    const cb = this.model.get('onClick');
    if (_.isFunction(cb)) {
      cb.call(this);
    }
  },
});
