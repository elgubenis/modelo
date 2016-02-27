/* globals Marionette */
'use strict';

function initMap() {
  new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

Marionette.DirectionView = Marionette.ItemView.extend({
  template: require('./template.hbs'),
  onRender() {
    initMap();
  },
});
