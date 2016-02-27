(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* globals _, Marionette, google */
'use strict';

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}

Marionette.DirectionView = Marionette.ItemView.extend({
  template: require('./template.hbs'),
  ui: {
    input: '#sample1',
    confirmation: '#confirmation'
  },
  events: {
    'click @ui.input': function clickUiInput() {
      this.ui.input.select();
    },
    'click @ui.confirmation': function clickUiConfirmation() {
      this.onClick();
    },
    'keyUp @ui.input': function keyUpUiInput() {
      this.model.set('direction', this.ui.input.val());
    }
  },
  onClick: function onClick() {},
  initialize: function initialize(options) {
    if (_.isFunction(options.onClick)) {
      this.onClick = options.onClick.bind(this);
    }
  },

  modelEvents: {
    'change:direction': function changeDirection() {
      this.ui.input.val(this.model.get('direction'));
    }
  },
  onShow: function onShow() {
    this.initMap();
  },
  initMap: function initMap() {
    var _this = this;

    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15,
      styles: [{ "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "color": "#f7f1df" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#d0e3b4" }] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.medical", "elementType": "geometry", "stylers": [{ "color": "#fbd3da" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#bde6ab" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffe15f" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#efd151" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "color": "black" }] }, { "featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [{ "color": "#cfb2db" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#a2daf2" }] }],
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
      }, // here´s the array of controls
      disableDefaultUI: true, // a way to quickly hide all controls
      mapTypeControl: false,
      scaleControl: false,
      zoomControl: false
    });

    var geocoder = new google.maps.Geocoder();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        geocoder.geocode({ location: pos }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var direction = results[0].formatted_address;
            _this.model.set('direction', direction);
          }
        });

        var infoWindow = new google.maps.InfoWindow({ map: map });

        infoWindow.setPosition(pos);
        infoWindow.setContent('Estas aqui?');
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    }
  }
});

},{"./template.hbs":2}],2:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = Handlebars;
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Wide card with share menu button -->\n<style>\n.demo-card-wide.mdl-card {\n  width: 100%;\n}\n.demo-card-wide > .mdl-card__title {\n  color: #000;\n  height: 150px;\n}\n.demo-card-wide > .mdl-card__menu {\n  color: #000;\n}\n#confirmation {\n  display: inline-block;\n  position: absolute;\n  right: 15px;\n  bottom: 25px;\n}\n.less-padding {\n  width: 65vw;\n}\n</style>\n\n<div class=\"demo-card-wide mdl-card mdl-shadow--2dp\">\n  <div class=\"mdl-card__title\" id=\"map\"></div>\n  <div class=\"mdl-card__supporting-text\">\n    <table>\n      <tr>\n        <td>\n          <div class=\"less-padding mdl-textfield mdl-js-textfield\">\n            <input class=\"mdl-textfield__input\" type=\"text\" id=\"sample1\">\n          </div>\n        </td>\n        <td>\n          <button id=\"confirmation\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\">\n            <i class=\"material-icons\">done</i>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </div>\n</div>";
},"useData":true});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdGVtcGxhdGUuaGJzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0NBOztBQUVBLFNBQVMsbUJBQVQsQ0FBNkIscUJBQTdCLEVBQW9ELFVBQXBELEVBQWdFLEdBQWhFLEVBQXFFO0FBQ25FLGFBQVcsV0FBWCxDQUF1QixHQUF2QixFQURtRTtBQUVuRSxhQUFXLFVBQVgsQ0FBc0Isd0JBQ0Esd0NBREEsR0FFQSxtREFGQSxDQUF0QixDQUZtRTtDQUFyRTs7QUFPQSxXQUFXLGFBQVgsR0FBMkIsV0FBVyxRQUFYLENBQW9CLE1BQXBCLENBQTJCO0FBQ3BELFlBQVUsUUFBUSxnQkFBUixDQUFWO0FBQ0EsTUFBSTtBQUNGLFdBQU8sVUFBUDtBQUNBLGtCQUFjLGVBQWQ7R0FGRjtBQUlBLFVBQVE7QUFDTix1QkFBbUIsd0JBQVk7QUFDN0IsV0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLE1BQWQsR0FENkI7S0FBWjtBQUduQiw4QkFBMEIsK0JBQVk7QUFDcEMsV0FBSyxPQUFMLEdBRG9DO0tBQVo7QUFHMUIsdUJBQW1CLHdCQUFZO0FBQzdCLFdBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxXQUFmLEVBQTRCLEtBQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxHQUFkLEVBQTVCLEVBRDZCO0tBQVo7R0FQckI7QUFXQSw4QkFBVSxFQWpCMEM7QUFvQnBELGtDQUFXLFNBQVM7QUFDbEIsUUFBSSxFQUFFLFVBQUYsQ0FBYSxRQUFRLE9BQVIsQ0FBakIsRUFBbUM7QUFDakMsV0FBSyxPQUFMLEdBQWUsUUFBUSxPQUFSLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQWYsQ0FEaUM7S0FBbkM7R0FyQmtEOztBQXlCcEQsZUFBYTtBQUNYLHdCQUFvQiwyQkFBWTtBQUM5QixXQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsR0FB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QUFkRSxRQWlCSixVQUFVLFdBQVYsRUFBdUI7QUFDekIsZ0JBQVUsV0FBVixDQUFzQixrQkFBdEIsQ0FBeUMsVUFBQyxRQUFELEVBQWM7QUFDckQsWUFBTSxNQUFNO0FBQ1YsZUFBSyxTQUFTLE1BQVQsQ0FBZ0IsUUFBaEI7QUFDTCxlQUFLLFNBQVMsTUFBVCxDQUFnQixTQUFoQjtTQUZELENBRCtDOztBQU1yRCxpQkFBUyxPQUFULENBQWlCLEVBQUUsVUFBVSxHQUFWLEVBQW5CLEVBQW9DLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkQsY0FBSSxXQUFXLE9BQU8sSUFBUCxDQUFZLGNBQVosQ0FBMkIsRUFBM0IsRUFBK0I7QUFDNUMsZ0JBQU0sWUFBWSxRQUFRLENBQVIsRUFBVyxpQkFBWCxDQUQwQjtBQUU1QyxrQkFBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFdBQWYsRUFBNEIsU0FBNUIsRUFGNEM7V0FBOUM7U0FEa0MsQ0FBcEMsQ0FOcUQ7O0FBYXJELFlBQU0sYUFBYSxJQUFJLE9BQU8sSUFBUCxDQUFZLFVBQVosQ0FBdUIsRUFBRSxRQUFGLEVBQTNCLENBQWIsQ0FiK0M7O0FBZXJELG1CQUFXLFdBQVgsQ0FBdUIsR0FBdkIsRUFmcUQ7QUFnQnJELG1CQUFXLFVBQVgsQ0FBc0IsYUFBdEIsRUFoQnFEO0FBaUJyRCxZQUFJLFNBQUosQ0FBYyxHQUFkLEVBakJxRDtPQUFkLEVBa0J0QyxZQUFNO0FBQ1AsNEJBQW9CLElBQXBCLEVBQTBCLFVBQTFCLEVBQXNDLElBQUksU0FBSixFQUF0QyxFQURPO09BQU4sQ0FsQkgsQ0FEeUI7S0FBM0I7R0FsRGtEO0NBQTNCLENBQTNCOzs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFscyBfLCBNYXJpb25ldHRlLCBnb29nbGUgKi9cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaGFuZGxlTG9jYXRpb25FcnJvcihicm93c2VySGFzR2VvbG9jYXRpb24sIGluZm9XaW5kb3csIHBvcykge1xuICBpbmZvV2luZG93LnNldFBvc2l0aW9uKHBvcyk7XG4gIGluZm9XaW5kb3cuc2V0Q29udGVudChicm93c2VySGFzR2VvbG9jYXRpb24gP1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Vycm9yOiBUaGUgR2VvbG9jYXRpb24gc2VydmljZSBmYWlsZWQuJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3I6IFlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBnZW9sb2NhdGlvbi4nKTtcbn1cblxuTWFyaW9uZXR0ZS5EaXJlY3Rpb25WaWV3ID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKSxcbiAgdWk6IHtcbiAgICBpbnB1dDogJyNzYW1wbGUxJyxcbiAgICBjb25maXJtYXRpb246ICcjY29uZmlybWF0aW9uJyxcbiAgfSxcbiAgZXZlbnRzOiB7XG4gICAgJ2NsaWNrIEB1aS5pbnB1dCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudWkuaW5wdXQuc2VsZWN0KCk7XG4gICAgfSxcbiAgICAnY2xpY2sgQHVpLmNvbmZpcm1hdGlvbic6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMub25DbGljaygpO1xuICAgIH0sXG4gICAgJ2tleVVwIEB1aS5pbnB1dCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMubW9kZWwuc2V0KCdkaXJlY3Rpb24nLCB0aGlzLnVpLmlucHV0LnZhbCgpKTtcbiAgICB9LFxuICB9LFxuICBvbkNsaWNrKCkge1xuXG4gIH0sXG4gIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgIGlmIChfLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkNsaWNrKSkge1xuICAgICAgdGhpcy5vbkNsaWNrID0gb3B0aW9ucy5vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuICB9LFxuICBtb2RlbEV2ZW50czoge1xuICAgICdjaGFuZ2U6ZGlyZWN0aW9uJzogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy51aS5pbnB1dC52YWwodGhpcy5tb2RlbC5nZXQoJ2RpcmVjdGlvbicpKTtcbiAgICB9LFxuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5pbml0TWFwKCk7XG4gIH0sXG4gIGluaXRNYXAoKSB7XG4gICAgY29uc3QgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcbiAgICAgIGNlbnRlcjogeyBsYXQ6IC0zNC4zOTcsIGxuZzogMTUwLjY0NCB9LFxuICAgICAgem9vbTogMTUsXG4gICAgICBzdHlsZXM6IFt7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmN2YxZGZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlLm5hdHVyYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2QwZTNiNFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGUubmF0dXJhbC50ZXJyYWluXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVsc1wiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLmJ1c2luZXNzXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kubWVkaWNhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmJkM2RhXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaS5wYXJrXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNiZGU2YWJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVsc1wiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZTE1ZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNlZmQxNTFcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5sb2NhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcImJsYWNrXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXQuc3RhdGlvbi5haXJwb3J0XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2NmYjJkYlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjYTJkYWYyXCJ9XX1dLFxuICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XG4gICAgICAgIG1hcFR5cGVJZHM6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLkhZQlJJRF0sXG4gICAgICB9LCAvLyBoZXJlwrRzIHRoZSBhcnJheSBvZiBjb250cm9sc1xuICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSwgLy8gYSB3YXkgdG8gcXVpY2tseSBoaWRlIGFsbCBjb250cm9sc1xuICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcbiAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyO1xuXG4gICAgLy8gVHJ5IEhUTUw1IGdlb2xvY2F0aW9uLlxuICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHtcbiAgICAgICAgICBsYXQ6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICAgICAgICBsbmc6IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsXG4gICAgICAgIH07XG5cbiAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSh7IGxvY2F0aW9uOiBwb3MgfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSByZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zZXQoJ2RpcmVjdGlvbicsIGRpcmVjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coeyBtYXAgfSk7XG5cbiAgICAgICAgaW5mb1dpbmRvdy5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICBpbmZvV2luZG93LnNldENvbnRlbnQoJ0VzdGFzIGFxdWk/Jyk7XG4gICAgICAgIG1hcC5zZXRDZW50ZXIocG9zKTtcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgaGFuZGxlTG9jYXRpb25FcnJvcih0cnVlLCBpbmZvV2luZG93LCBtYXAuZ2V0Q2VudGVyKCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxufSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIjwhLS0gV2lkZSBjYXJkIHdpdGggc2hhcmUgbWVudSBidXR0b24gLS0+XFxuPHN0eWxlPlxcbi5kZW1vLWNhcmQtd2lkZS5tZGwtY2FyZCB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmRlbW8tY2FyZC13aWRlID4gLm1kbC1jYXJkX190aXRsZSB7XFxuICBjb2xvcjogIzAwMDtcXG4gIGhlaWdodDogMTUwcHg7XFxufVxcbi5kZW1vLWNhcmQtd2lkZSA+IC5tZGwtY2FyZF9fbWVudSB7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuI2NvbmZpcm1hdGlvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMTVweDtcXG4gIGJvdHRvbTogMjVweDtcXG59XFxuLmxlc3MtcGFkZGluZyB7XFxuICB3aWR0aDogNjV2dztcXG59XFxuPC9zdHlsZT5cXG5cXG48ZGl2IGNsYXNzPVxcXCJkZW1vLWNhcmQtd2lkZSBtZGwtY2FyZCBtZGwtc2hhZG93LS0yZHBcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwibWRsLWNhcmRfX3RpdGxlXFxcIiBpZD1cXFwibWFwXFxcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcIm1kbC1jYXJkX19zdXBwb3J0aW5nLXRleHRcXFwiPlxcbiAgICA8dGFibGU+XFxuICAgICAgPHRyPlxcbiAgICAgICAgPHRkPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZXNzLXBhZGRpbmcgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkXFxcIj5cXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XFxcIm1kbC10ZXh0ZmllbGRfX2lucHV0XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBpZD1cXFwic2FtcGxlMVxcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC90ZD5cXG4gICAgICAgIDx0ZD5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiY29uZmlybWF0aW9uXFxcIiBjbGFzcz1cXFwibWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1idXR0b24tLWZhYiBtZGwtanMtcmlwcGxlLWVmZmVjdCBtZGwtYnV0dG9uLS1jb2xvcmVkXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnNcXFwiPmRvbmU8L2k+XFxuICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgPC90ZD5cXG4gICAgICA8L3RyPlxcbiAgICA8L3RhYmxlPlxcbiAgPC9kaXY+XFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcbiJdfQ==
