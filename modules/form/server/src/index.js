(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* globals Marionette */
'use strict';

Marionette.form = Marionette.ItemView.extend({
  template: require('./template.hbs'),
  className: 'form-message-container',
  onRender: function onRender() {},

  events: {
    'click .form-message-button': 'clickCheck'
  },
  initialize: function initialize(options) {
    this.viewCheck = options.checkCall;
  },
  clickCheck: function clickCheck() {
    this.viewCheck();
  }
});

},{"./template.hbs":2}],2:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = Handlebars;
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Wide card with share menu button -->\n\n<h3 class=\"form-message-title\">¿Eres mayor de edad?</h3>\n<div class=\"form-message-container-check\">\n    <button class=\"form-message-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\">\n      SI\n    </button>\n    <button class=\"form-message-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\">\n      NO\n    </button>\n</div>\n";
},"useData":true});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdGVtcGxhdGUuaGJzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0NBOztBQUlBLFdBQVcsSUFBWCxHQUFrQixXQUFXLFFBQVgsQ0FBb0IsTUFBcEIsQ0FBMkI7QUFDM0MsWUFBVSxRQUFRLGdCQUFSLENBQVY7QUFDQSxhQUFXLHdCQUFYO0FBQ0EsZ0NBQVcsRUFIZ0M7O0FBTTNDLFVBQU87QUFDTCxrQ0FBOEIsWUFBOUI7R0FERjtBQUdBLGtDQUFXLFNBQVM7QUFDbEIsU0FBSyxTQUFMLEdBQWlCLFFBQVEsU0FBUixDQURDO0dBVHVCO0FBWTNDLG9DQUFZO0FBQ1YsU0FBSyxTQUFMLEdBRFU7R0FaK0I7Q0FBM0IsQ0FBbEI7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWxzIE1hcmlvbmV0dGUgKi9cbid1c2Ugc3RyaWN0JztcblxuXG5cbk1hcmlvbmV0dGUuZm9ybSA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyksXG4gIGNsYXNzTmFtZTogJ2Zvcm0tbWVzc2FnZS1jb250YWluZXInLFxuICBvblJlbmRlcigpIHtcbiAgICBcbiAgfSxcbiAgZXZlbnRzOntcbiAgICAnY2xpY2sgLmZvcm0tbWVzc2FnZS1idXR0b24nOiAnY2xpY2tDaGVjaydcbiAgfSxcbiAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgdGhpcy52aWV3Q2hlY2sgPSBvcHRpb25zLmNoZWNrQ2FsbDtcbiAgfSxcbiAgY2xpY2tDaGVjaygpe1xuICAgIHRoaXMudmlld0NoZWNrKCk7XG4gIH1cblxufSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIjwhLS0gV2lkZSBjYXJkIHdpdGggc2hhcmUgbWVudSBidXR0b24gLS0+XFxuXFxuPGgzIGNsYXNzPVxcXCJmb3JtLW1lc3NhZ2UtdGl0bGVcXFwiPsK/RXJlcyBtYXlvciBkZSBlZGFkPzwvaDM+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1tZXNzYWdlLWNvbnRhaW5lci1jaGVja1xcXCI+XFxuICAgIDxidXR0b24gY2xhc3M9XFxcImZvcm0tbWVzc2FnZS1idXR0b24gbWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1idXR0b24tLXJhaXNlZCBtZGwtanMtcmlwcGxlLWVmZmVjdCBtZGwtYnV0dG9uLS1hY2NlbnRcXFwiPlxcbiAgICAgIFNJXFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIGNsYXNzPVxcXCJmb3JtLW1lc3NhZ2UtYnV0dG9uIG1kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtYnV0dG9uLS1yYWlzZWQgbWRsLWpzLXJpcHBsZS1lZmZlY3QgbWRsLWJ1dHRvbi0tYWNjZW50XFxcIj5cXG4gICAgICBOT1xcbiAgICA8L2J1dHRvbj5cXG48L2Rpdj5cXG5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuIl19
