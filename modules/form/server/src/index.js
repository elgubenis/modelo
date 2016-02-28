(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = Handlebars;
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button class=\"form-message-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\" id=\"form-"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "\">\n      "
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "\n</button>";
},"useData":true});

},{}],2:[function(require,module,exports){
/* globals Marionette */
'use strict';

var child = Marionette.ItemView.extend({
  template: require('./childTemplate.hbs'),
  events: {
    'click': 'someCheck'
  },
  someCheck: function someCheck() {
    this.clickFunction();
  },
  initialize: function initialize(options) {
    this.clickFunction = options.model.get('onClick');
  }
});

Marionette.Form = Marionette.CompositeView.extend({
  template: require('./template.hbs'),
  className: 'form-message-container mdl-card mdl-shadow--2dp',
  childView: child,
  childViewContainer: '.form-message-container-check',
  onShow: function onShow() {
    $('.form-message-title').text(this.textLabel);
  },

  events: {
    'click .form-message-button': 'clickCheck'
  },
  initialize: function initialize(options) {
    this.collection = new Backbone.Collection(options.buttons);
    this.textLabel = options.text;
  }
});

},{"./childTemplate.hbs":1,"./template.hbs":3}],3:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = Handlebars;
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Wide card with share menu button -->\n\n<h3 class=\"form-message-title\"></h3>\n<div class=\"form-message-container-check\">\n    \n</div>\n";
},"useData":true});

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2hpbGRUZW1wbGF0ZS5oYnMiLCJzcmMvaW5kZXguanMiLCJzcmMvdGVtcGxhdGUuaGJzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQTs7QUFFQSxJQUFJLFFBQVEsV0FBVyxRQUFYLENBQW9CLE1BQXBCLENBQTJCO0FBQ3JDLFlBQVUsUUFBUSxxQkFBUixDQUFWO0FBQ0EsVUFBTztBQUNMLGFBQVMsV0FBVDtHQURGO0FBR0Esa0NBQVc7QUFDVCxTQUFLLGFBQUwsR0FEUztHQUwwQjtBQVFyQyxrQ0FBVyxTQUFRO0FBQ2pCLFNBQUssYUFBTCxHQUFxQixRQUFRLEtBQVIsQ0FBYyxHQUFkLENBQWtCLFNBQWxCLENBQXJCLENBRGlCO0dBUmtCO0NBQTNCLENBQVI7O0FBYUosV0FBVyxJQUFYLEdBQWtCLFdBQVcsYUFBWCxDQUF5QixNQUF6QixDQUFnQztBQUNoRCxZQUFVLFFBQVEsZ0JBQVIsQ0FBVjtBQUNBLGFBQVcsaURBQVg7QUFDQSxhQUFXLEtBQVg7QUFDQSxzQkFBb0IsK0JBQXBCO0FBQ0EsNEJBQVE7QUFDTixNQUFFLHFCQUFGLEVBQXlCLElBQXpCLENBQThCLEtBQUssU0FBTCxDQUE5QixDQURNO0dBTHdDOztBQVNoRCxVQUFPO0FBQ0wsa0NBQThCLFlBQTlCO0dBREY7QUFHQSxrQ0FBVyxTQUFTO0FBQ2xCLFNBQUssVUFBTCxHQUFrQixJQUFJLFNBQVMsVUFBVCxDQUFvQixRQUFRLE9BQVIsQ0FBMUMsQ0FEa0I7QUFFbEIsU0FBSyxTQUFMLEdBQWlCLFFBQVEsSUFBUixDQUZDO0dBWjRCO0NBQWhDLENBQWxCOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSBIYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzQ29tcGlsZXIudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDoge30sIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8YnV0dG9uIGNsYXNzPVxcXCJmb3JtLW1lc3NhZ2UtYnV0dG9uIG1kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtYnV0dG9uLS1yYWlzZWQgbWRsLWpzLXJpcHBsZS1lZmZlY3QgbWRsLWJ1dHRvbi0tYWNjZW50XFxcIiBpZD1cXFwiZm9ybS1cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubGFiZWwgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmxhYmVsIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJsYWJlbFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcbiAgICAgIFwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5sYWJlbCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubGFiZWwgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImxhYmVsXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcbjwvYnV0dG9uPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG4iLCIvKiBnbG9iYWxzIE1hcmlvbmV0dGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIGNoaWxkID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9jaGlsZFRlbXBsYXRlLmhicycpLFxuICBldmVudHM6e1xuICAgICdjbGljayc6ICdzb21lQ2hlY2snXG4gIH0sXG4gIHNvbWVDaGVjaygpe1xuICAgIHRoaXMuY2xpY2tGdW5jdGlvbigpO1xuICB9LFxuICBpbml0aWFsaXplKG9wdGlvbnMpe1xuICAgIHRoaXMuY2xpY2tGdW5jdGlvbiA9IG9wdGlvbnMubW9kZWwuZ2V0KCdvbkNsaWNrJyk7XG4gIH1cbn0pO1xuXG5NYXJpb25ldHRlLkZvcm0gPSBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcuZXh0ZW5kKHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyksXG4gIGNsYXNzTmFtZTogJ2Zvcm0tbWVzc2FnZS1jb250YWluZXIgbWRsLWNhcmQgbWRsLXNoYWRvdy0tMmRwJyxcbiAgY2hpbGRWaWV3OiBjaGlsZCxcbiAgY2hpbGRWaWV3Q29udGFpbmVyOiAnLmZvcm0tbWVzc2FnZS1jb250YWluZXItY2hlY2snLFxuICBvblNob3coKXtcbiAgICAkKCcuZm9ybS1tZXNzYWdlLXRpdGxlJykudGV4dCh0aGlzLnRleHRMYWJlbCk7XG4gICAgXG4gIH0sXG4gIGV2ZW50czp7XG4gICAgJ2NsaWNrIC5mb3JtLW1lc3NhZ2UtYnV0dG9uJzogJ2NsaWNrQ2hlY2snXG4gIH0sXG4gIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgIHRoaXMuY29sbGVjdGlvbiA9IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uKG9wdGlvbnMuYnV0dG9ucyk7XG4gICAgdGhpcy50ZXh0TGFiZWwgPSBvcHRpb25zLnRleHQ7XG4gIH1cblxufSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIjwhLS0gV2lkZSBjYXJkIHdpdGggc2hhcmUgbWVudSBidXR0b24gLS0+XFxuXFxuPGgzIGNsYXNzPVxcXCJmb3JtLW1lc3NhZ2UtdGl0bGVcXFwiPjwvaDM+XFxuPGRpdiBjbGFzcz1cXFwiZm9ybS1tZXNzYWdlLWNvbnRhaW5lci1jaGVja1xcXCI+XFxuICAgIFxcbjwvZGl2PlxcblwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG4iXX0=
