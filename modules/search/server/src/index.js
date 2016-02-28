(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* globals Marionette */
'use strict';

Marionette.search = Marionette.LayoutView.extend({
  template: require('./template.hbs'),
  className: 'form-message-container',
  regions: {
    title: '#title',
    search: '#search'

  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdGVtcGxhdGUuaGJzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0NBOztBQUdBLFdBQVcsTUFBWCxHQUFvQixXQUFXLFVBQVgsQ0FBc0IsTUFBdEIsQ0FBNkI7QUFDL0MsWUFBVSxRQUFRLGdCQUFSLENBQVY7QUFDQSxhQUFXLHdCQUFYO0FBQ0EsV0FBUTtBQUNOLFdBQU8sUUFBUDtBQUNBLFlBQVEsU0FBUjs7R0FGRjtBQUtBLFVBQU87QUFDTCxrQ0FBOEIsWUFBOUI7R0FERjtBQUdBLGtDQUFXLFNBQVM7QUFDbEIsU0FBSyxTQUFMLEdBQWlCLFFBQVEsU0FBUixDQURDO0dBWDJCO0FBYy9DLG9DQUFZO0FBQ1YsU0FBSyxTQUFMLEdBRFU7R0FkbUM7Q0FBN0IsQ0FBcEI7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWxzIE1hcmlvbmV0dGUgKi9cbid1c2Ugc3RyaWN0JztcblxuXG5NYXJpb25ldHRlLnNlYXJjaCA9IE1hcmlvbmV0dGUuTGF5b3V0Vmlldy5leHRlbmQoe1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKSxcbiAgY2xhc3NOYW1lOiAnZm9ybS1tZXNzYWdlLWNvbnRhaW5lcicsXG4gIHJlZ2lvbnM6e1xuICAgIHRpdGxlOiAnI3RpdGxlJyxcbiAgICBzZWFyY2g6ICcjc2VhcmNoJ1xuXG4gIH0sXG4gIGV2ZW50czp7XG4gICAgJ2NsaWNrIC5mb3JtLW1lc3NhZ2UtYnV0dG9uJzogJ2NsaWNrQ2hlY2snXG4gIH0sXG4gIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgIHRoaXMudmlld0NoZWNrID0gb3B0aW9ucy5jaGVja0NhbGw7XG4gIH0sXG4gIGNsaWNrQ2hlY2soKXtcbiAgICB0aGlzLnZpZXdDaGVjaygpO1xuICB9XG5cbn0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IEhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCI8IS0tIFdpZGUgY2FyZCB3aXRoIHNoYXJlIG1lbnUgYnV0dG9uIC0tPlxcblxcbjxoMyBjbGFzcz1cXFwiZm9ybS1tZXNzYWdlLXRpdGxlXFxcIj7Cv0VyZXMgbWF5b3IgZGUgZWRhZD88L2gzPlxcbjxkaXYgY2xhc3M9XFxcImZvcm0tbWVzc2FnZS1jb250YWluZXItY2hlY2tcXFwiPlxcbiAgICA8YnV0dG9uIGNsYXNzPVxcXCJmb3JtLW1lc3NhZ2UtYnV0dG9uIG1kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtYnV0dG9uLS1yYWlzZWQgbWRsLWpzLXJpcHBsZS1lZmZlY3QgbWRsLWJ1dHRvbi0tYWNjZW50XFxcIj5cXG4gICAgICBTSVxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiBjbGFzcz1cXFwiZm9ybS1tZXNzYWdlLWJ1dHRvbiBtZGwtYnV0dG9uIG1kbC1qcy1idXR0b24gbWRsLWJ1dHRvbi0tcmFpc2VkIG1kbC1qcy1yaXBwbGUtZWZmZWN0IG1kbC1idXR0b24tLWFjY2VudFxcXCI+XFxuICAgICAgTk9cXG4gICAgPC9idXR0b24+XFxuPC9kaXY+XFxuXCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcbiJdfQ==
