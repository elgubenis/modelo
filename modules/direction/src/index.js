/* globals _, Marionette, google */
'use strict';

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

Marionette.DirectionView = Marionette.ItemView.extend({
  template: require('./template.hbs'),
  ui: {
    input: '#sample1',
    confirmation: '#confirmation',
  },
  events: {
    'click @ui.input': function () {
      this.ui.input.select();
    },
    'click @ui.confirmation': function () {
      this.onClick();
    },
    'keyUp @ui.input': function () {
      this.model.set('direction', this.ui.input.val());
    },
  },
  onClick() {

  },
  initialize(options) {
    if (_.isFunction(options.onClick)) {
      this.onClick = options.onClick.bind(this);
    }
  },
  modelEvents: {
    'change:direction': function () {
      this.ui.input.val(this.model.get('direction'));
    },
  },
  onShow() {
    this.initMap();
  },
  initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15,
      styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}],
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
      }, // here´s the array of controls
      disableDefaultUI: true, // a way to quickly hide all controls
      mapTypeControl: false,
      scaleControl: false,
      zoomControl: false,
    });

    const geocoder = new google.maps.Geocoder;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const direction = results[0].formatted_address;
            this.model.set('direction', direction);
          }
        });

        const infoWindow = new google.maps.InfoWindow({ map });

        infoWindow.setPosition(pos);
        infoWindow.setContent('Estas aqui?');
        map.setCenter(pos);
      }, () => {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    }
  },
});
