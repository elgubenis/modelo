/* globals Marionette */

import speedDial from './speedDial';

export default Marionette.CollectionView.extend({
  childView: speedDial,
  tagName: 'div',
  className: 'mdl-speed-dial__options',

});
