(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* globals Marionette */
'use strict';

Marionette.Search = Marionette.LayoutView.extend({
  template: require('./template.hbs'),
  className: 'mdl-layout__header-row',
  regions: {

    search: '#search'

  },
  events: {
    'keyup .search-input': 'searchResults'
  },
  ui: {
    title: '.title-search'
  },
  initialize: function initialize(options) {
    this.collection = options.collection;
    self = this;
    this.channel = Backbone.Radio.channel('header');
    this.channel.on('title', function (title) {
      self.ui.title.html(title);
    });

    _.bindAll(this, 'findValInput');
    this.listenTo(this.collection, 'searched', this.changeFlag);
    this.debounceFunction = _.throttle(this.findValInput, 500);
    this.flagAct = false;
  },
  searchResults: function searchResults(evt) {
    this.findValInput(evt);
  },
  findValInput: function findValInput(evt) {
    var value = this.$el.find('input').val();
    if (this.flagAct == false) {
      this.flagAct = true;
      this.collection.trigger('search', value);
    }
  },
  changeFlag: function changeFlag() {
    this.flagAct = false;
  }
});

},{"./template.hbs":2}],2:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = Handlebars;
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <span class=\"mdl-layout-title title-search\" id=\"title-search\"></span>\n <div class=\"mdl-layout-spacer\"></div>\n        <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--expandable\n                      mdl-textfield--floating-label mdl-textfield--align-right\">\n          <label class=\"mdl-button mdl-js-button mdl-button--icon\" for=\"fixed-header-drawer-exp\">\n              <i class=\"material-icons\">search</i>\n            </label>\n          <div class=\"mdl-textfield__expandable-holder\">\n            <input class=\"mdl-textfield__input search-input\" type=\"text\" name=\"sample\" id=\"fixed-header-drawer-exp\">\n          </div>\n        </div>";
},"useData":true});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdGVtcGxhdGUuaGJzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0NBOztBQUdBLFdBQVcsTUFBWCxHQUFvQixXQUFXLFVBQVgsQ0FBc0IsTUFBdEIsQ0FBNkI7QUFDL0MsWUFBVSxRQUFRLGdCQUFSLENBQVY7QUFDQSxhQUFXLHdCQUFYO0FBQ0EsV0FBUTs7QUFFTixZQUFRLFNBQVI7O0dBRkY7QUFLQSxVQUFPO0FBQ0wsMkJBQXVCLGVBQXZCO0dBREY7QUFHQSxNQUFJO0FBQ0gsV0FBTyxlQUFQO0dBREQ7QUFHQSxrQ0FBVyxTQUFTO0FBQ2xCLFNBQUssVUFBTCxHQUFrQixRQUFRLFVBQVIsQ0FEQTtBQUVsQixXQUFNLElBQU4sQ0FGa0I7QUFHbkIsU0FBSyxPQUFMLEdBQWUsU0FBUyxLQUFULENBQWUsT0FBZixDQUF1QixRQUF2QixDQUFmLENBSG1CO0FBSW5CLFNBQUssT0FBTCxDQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFBQyxLQUFELEVBQVc7QUFDbEMsV0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLElBQWQsQ0FBbUIsS0FBbkIsRUFEa0M7S0FBWCxDQUF6QixDQUptQjs7QUFRbkIsTUFBRSxPQUFGLENBQVUsSUFBVixFQUFnQixjQUFoQixFQVJtQjtBQVNuQixTQUFLLFFBQUwsQ0FBYyxLQUFLLFVBQUwsRUFBaUIsVUFBL0IsRUFBMkMsS0FBSyxVQUFMLENBQTNDLENBVG1CO0FBVW5CLFNBQUssZ0JBQUwsR0FBd0IsRUFBRSxRQUFGLENBQVcsS0FBSyxZQUFMLEVBQW1CLEdBQTlCLENBQXhCLENBVm1CO0FBV25CLFNBQUssT0FBTCxHQUFlLEtBQWYsQ0FYbUI7R0FkMkI7QUE0Qi9DLHdDQUFjLEtBQUk7QUFDaEIsU0FBSyxZQUFMLENBQWtCLEdBQWxCLEVBRGdCO0dBNUI2QjtBQStCL0Msc0NBQWEsS0FBSTtBQUNmLFFBQU0sUUFBUSxLQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsT0FBZCxFQUF1QixHQUF2QixFQUFSLENBRFM7QUFFZixRQUFHLEtBQUssT0FBTCxJQUFnQixLQUFoQixFQUFzQjtBQUN2QixXQUFLLE9BQUwsR0FBZSxJQUFmLENBRHVCO0FBRXZCLFdBQUssVUFBTCxDQUFnQixPQUFoQixDQUF3QixRQUF4QixFQUFrQyxLQUFsQyxFQUZ1QjtLQUF6QjtHQWpDNkM7QUFzQy9DLG9DQUFZO0FBQ1YsU0FBSyxPQUFMLEdBQWUsS0FBZixDQURVO0dBdENtQztDQUE3QixDQUFwQjs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbHMgTWFyaW9uZXR0ZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5cbk1hcmlvbmV0dGUuU2VhcmNoID0gTWFyaW9uZXR0ZS5MYXlvdXRWaWV3LmV4dGVuZCh7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpLFxuICBjbGFzc05hbWU6ICdtZGwtbGF5b3V0X19oZWFkZXItcm93JyxcbiAgcmVnaW9uczp7XG4gICAgXG4gICAgc2VhcmNoOiAnI3NlYXJjaCdcblxuICB9LFxuICBldmVudHM6e1xuICAgICdrZXl1cCAuc2VhcmNoLWlucHV0JzogJ3NlYXJjaFJlc3VsdHMnXG4gIH0sXG4gIHVpOiB7XG4gICB0aXRsZTogJy50aXRsZS1zZWFyY2gnXG4gIH0sXG4gIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgIHRoaXMuY29sbGVjdGlvbiA9IG9wdGlvbnMuY29sbGVjdGlvbjtcbiAgICBzZWxmID10aGlzO1xuICAgdGhpcy5jaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnaGVhZGVyJyk7XG4gICB0aGlzLmNoYW5uZWwub24oJ3RpdGxlJywgKHRpdGxlKSA9PiB7XG4gICAgIHNlbGYudWkudGl0bGUuaHRtbCh0aXRsZSk7XG4gICB9KTtcbiAgIFxuICAgXy5iaW5kQWxsKHRoaXMsICdmaW5kVmFsSW5wdXQnKTtcbiAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCAnc2VhcmNoZWQnLCB0aGlzLmNoYW5nZUZsYWcpO1xuICAgdGhpcy5kZWJvdW5jZUZ1bmN0aW9uID0gXy50aHJvdHRsZSh0aGlzLmZpbmRWYWxJbnB1dCwgNTAwKVxuICAgdGhpcy5mbGFnQWN0ID0gZmFsc2U7IFxuXG4gIH0sXG4gIHNlYXJjaFJlc3VsdHMoZXZ0KXtcbiAgICB0aGlzLmZpbmRWYWxJbnB1dChldnQpO1xuICB9LFxuICBmaW5kVmFsSW5wdXQoZXZ0KXtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJGVsLmZpbmQoJ2lucHV0JykudmFsKCk7XG4gICAgaWYodGhpcy5mbGFnQWN0ID09IGZhbHNlKXtcbiAgICAgIHRoaXMuZmxhZ0FjdCA9IHRydWVcbiAgICAgIHRoaXMuY29sbGVjdGlvbi50cmlnZ2VyKCdzZWFyY2gnLCB2YWx1ZSk7XG4gICAgfVxuICB9LFxuICBjaGFuZ2VGbGFnKCl7XG4gICAgdGhpcy5mbGFnQWN0ID0gZmFsc2U7XG4gIH1cbn0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IEhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgPHNwYW4gY2xhc3M9XFxcIm1kbC1sYXlvdXQtdGl0bGUgdGl0bGUtc2VhcmNoXFxcIiBpZD1cXFwidGl0bGUtc2VhcmNoXFxcIj48L3NwYW4+XFxuIDxkaXYgY2xhc3M9XFxcIm1kbC1sYXlvdXQtc3BhY2VyXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZCBtZGwtdGV4dGZpZWxkLS1leHBhbmRhYmxlXFxuICAgICAgICAgICAgICAgICAgICAgIG1kbC10ZXh0ZmllbGQtLWZsb2F0aW5nLWxhYmVsIG1kbC10ZXh0ZmllbGQtLWFsaWduLXJpZ2h0XFxcIj5cXG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJtZGwtYnV0dG9uIG1kbC1qcy1idXR0b24gbWRsLWJ1dHRvbi0taWNvblxcXCIgZm9yPVxcXCJmaXhlZC1oZWFkZXItZHJhd2VyLWV4cFxcXCI+XFxuICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnNcXFwiPnNlYXJjaDwvaT5cXG4gICAgICAgICAgICA8L2xhYmVsPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtZGwtdGV4dGZpZWxkX19leHBhbmRhYmxlLWhvbGRlclxcXCI+XFxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJtZGwtdGV4dGZpZWxkX19pbnB1dCBzZWFyY2gtaW5wdXRcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcInNhbXBsZVxcXCIgaWQ9XFxcImZpeGVkLWhlYWRlci1kcmF3ZXItZXhwXFxcIj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuIl19
