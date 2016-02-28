(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* globals Marionette */
'use strict';

var child = Marionette.ItemView.extend({
  template: require('itemsArticlesToBuy.hbs'),
  modelEvents: {
    'change': 'render'
  },
  initialize: function initialize(options) {
    console.log('initialize item');
    console.log(options.model);
    this.model = options.model;
  },
  onRender: function onRender() {
    this.setTotal(this.model);
  },
  onShow: function onShow() {
    this.calculateAllTotal();
  },
  events: {
    'click .ticket-buttons': 'onClickButtons',
    'change .ticket-input': 'onKeyInput'
  },
  onClickButtons: function onClickButtons(evt) {
    var ev = $(evt.currentTarget).attr("act");
    if (ev == 'rem-ticket') {
      var quant = Number(this.model.get('quantity'));
      quant -= 1;
      if (quant >= 0) {
        this.model.set('quantity', quant);
        this.calculateAllTotal();
      }
    }
    if (ev == 'add-ticket') {
      var quant = Number(this.model.get('quantity'));
      quant += 1;
      this.model.set('quantity', quant);
      this.calculateAllTotal();
    }
  },
  onKeyInput: function onKeyInput(evt) {
    var quant = $(evt.currentTarget).val();
    console.log(quant);
    if (quant >= 0) {
      this.model.set('quantity', quant);
      this.calculateAllTotal();
    } else {
      quant = 0;
      this.model.set('quantity', quant);
      this.calculateAllTotal();
    }
  },

  setTotal: function setTotal(model) {
    var price = model.get('price');
    var quantity = model.get('quantity');
    var tot = Number(this.calculateTotal(price, quantity));
    model.set('total', tot);
  },
  calculateTotal: function calculateTotal(price, quantity) {
    var tot = (price * quantity).toFixed(2);
    return tot;
  },
  calculateAllTotal: function calculateAllTotal() {
    this.model.collection.trigger('calculateAllTicket');
  }
});

Marionette.Ticket = Marionette.CompositeView.extend({
  template: require('./template.hbs'),
  className: 'ticket-title-container',
  initialize: function initialize(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, 'calculateAllTicket', this.calculateAllTicket);
  },
  childViewContainer: '.ticket-articles-container',
  childView: child,
  calculateAllTicket: function calculateAllTicket() {
    var totalTicket = 0;
    $.each(this.collection.models, function (key, val) {
      totalTicket += Number(val.attributes.total);
    });
    this.collection.totalTicket = totalTicket.toFixed(2);
    var stringTot = 'TOTAL: $ ' + this.collection.totalTicket;
    $('.ticket-total-ticket').text(stringTot);
  }
});

},{"./template.hbs":3,"itemsArticlesToBuy.hbs":2}],2:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = Handlebars;
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"mdl-list__item mdl-list__item\">\n    <span class=\"mdl-list__item-primary-content article-quantity-toBuy\" style=\"\">\n\n          <button act=\"rem-ticket\" class=\"ticket-buttons mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--mini-fab \">\n            <i class=\"material-icons\">remove</i>\n          </button>\n\n            <input min=\"0\" type=\"number\" class=\"mdl-textfield__input ticket-input\" value=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\">\n          \n          <button act=\"add-ticket\" class=\"ticket-buttons mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--mini-fab \">\n            <i class=\"material-icons\">add</i>\n          </button>\n\n    </span>\n    <span class=\"mdl-list__item-primary-content article-quantity-toBuy\" style=\"\">\n      <span style=\"\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n    </span>\n    <span class=\"mdl-list__item-primary-content article-ticket-unit\" style=\"\"> \n      <span class=\"ticket-unit-price\">$"
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "</span>\n    </span>\n\n    <span class=\"mdl-list__item-primary-content ticket-total-unit\" style=\"\"><span class=\"ticket-total-uni\">$"
    + alias4(((helper = (helper = helpers.total || (depth0 != null ? depth0.total : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"total","hash":{},"data":data}) : helper)))
    + "</span>\n      \n    </span>\n  </li>";
},"useData":true});

},{}],3:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = Handlebars;
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<li class=\"mdl-list__item mdl-list__item \">\n    <span class=\"mdl-list__item-primary-content ticket-titles title-ticket-quantity\" style=\"\">\n		  Cantidad\n    </span>\n    <span class=\"mdl-list__item-primary-content article-quantity-toBuy \" style=\"\">\n      <span class=\"ticket-titles\" style=\"\">Nombre</span>\n    </span>\n    <span class=\"mdl-list__item-primary-content article-ticket-unit\" style=\"\"> \n      <span class=\"ticket-unit-price ticket-titles\">$ C/U</span>\n    </span>\n\n    <span class=\"mdl-list__item-primary-content ticket-total-unit\" style=\"\"><span class=\"ticket-titles ticket-total-uni\">Total</span>\n      \n    </span>\n  </li>\n\n\n\n<ul class='mdl-list ticket-articles-container'>\n\n</ul>\n<footer class=\"footer-tickets\">\n	<span class=\"ticket-total-ticket\">TOTAL: $ 0.0</span>\n</footer>";
},"useData":true});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvaXRlbXNBcnRpY2xlc1RvQnV5LmhicyIsInNyYy90ZW1wbGF0ZS5oYnMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQ0E7O0FBQ0EsSUFBSSxRQUFRLFdBQVcsUUFBWCxDQUFvQixNQUFwQixDQUEyQjtBQUNyQyxZQUFVLFFBQVEsd0JBQVIsQ0FBVjtBQUNBLGVBQWE7QUFDWCxjQUFVLFFBQVY7R0FERjtBQUdBLGNBQVksb0JBQVMsT0FBVCxFQUFrQjtBQUM1QixZQUFRLEdBQVIsQ0FBWSxpQkFBWixFQUQ0QjtBQUU1QixZQUFRLEdBQVIsQ0FBWSxRQUFRLEtBQVIsQ0FBWixDQUY0QjtBQUc1QixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsQ0FIZTtHQUFsQjtBQUtaLFlBQVUsb0JBQVU7QUFDbEIsU0FBSyxRQUFMLENBQWMsS0FBSyxLQUFMLENBQWQsQ0FEa0I7R0FBVjtBQUdWLFVBQVEsa0JBQVU7QUFDaEIsU0FBSyxpQkFBTCxHQURnQjtHQUFWO0FBR1IsVUFBTztBQUNMLDZCQUF5QixnQkFBekI7QUFDQSw0QkFBd0IsWUFBeEI7R0FGRjtBQUlBLGtCQUFnQix3QkFBUyxHQUFULEVBQWM7QUFDNUIsUUFBTSxLQUFLLEVBQUUsSUFBSSxhQUFKLENBQUYsQ0FBcUIsSUFBckIsQ0FBMEIsS0FBMUIsQ0FBTCxDQURzQjtBQUU1QixRQUFHLE1BQUssWUFBTCxFQUFrQjtBQUNwQixVQUFJLFFBQVEsT0FBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsVUFBZixDQUFQLENBQVIsQ0FEZ0I7QUFFcEIsZUFBUyxDQUFULENBRm9CO0FBR3BCLFVBQUcsU0FBUyxDQUFULEVBQVk7QUFDYixhQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsVUFBZixFQUEyQixLQUEzQixFQURhO0FBRWIsYUFBSyxpQkFBTCxHQUZhO09BQWY7S0FIRDtBQVFBLFFBQUcs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dGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbHMgTWFyaW9uZXR0ZSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIGNoaWxkID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnaXRlbXNBcnRpY2xlc1RvQnV5LmhicycpLFxuICBtb2RlbEV2ZW50czoge1xuICAgICdjaGFuZ2UnOiAncmVuZGVyJ1xuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgY29uc29sZS5sb2coJ2luaXRpYWxpemUgaXRlbScpO1xuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMubW9kZWwpO1xuICAgIHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuICB9LFxuICBvblJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICB0aGlzLnNldFRvdGFsKHRoaXMubW9kZWwpO1xuICB9LFxuICBvblNob3c6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5jYWxjdWxhdGVBbGxUb3RhbCgpO1xuICB9LFxuICBldmVudHM6e1xuICAgICdjbGljayAudGlja2V0LWJ1dHRvbnMnOiAnb25DbGlja0J1dHRvbnMnLFxuICAgICdjaGFuZ2UgLnRpY2tldC1pbnB1dCc6ICdvbktleUlucHV0J1xuICB9LFxuICBvbkNsaWNrQnV0dG9uczogZnVuY3Rpb24oZXZ0KSB7XG4gICAgY29uc3QgZXYgPSAkKGV2dC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwiYWN0XCIpO1xuICAgIGlmKGV2ID09J3JlbS10aWNrZXQnKXtcbiAgICAgdmFyIHF1YW50ID0gTnVtYmVyKHRoaXMubW9kZWwuZ2V0KCdxdWFudGl0eScpKTtcbiAgICAgcXVhbnQgLT0gMTtcbiAgICAgaWYocXVhbnQgPj0gMCApe1xuICAgICAgIHRoaXMubW9kZWwuc2V0KCdxdWFudGl0eScsIHF1YW50KTtcbiAgICAgICB0aGlzLmNhbGN1bGF0ZUFsbFRvdGFsKCk7XG4gICAgIH1cbiAgICB9XG4gICAgaWYoZXYgPT0gJ2FkZC10aWNrZXQnKSB7XG4gICAgICB2YXIgcXVhbnQgPSBOdW1iZXIodGhpcy5tb2RlbC5nZXQoJ3F1YW50aXR5JykpO1xuICAgICAgcXVhbnQgKz0gMTtcbiAgICAgIHRoaXMubW9kZWwuc2V0KCdxdWFudGl0eScsIHF1YW50KTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQWxsVG90YWwoKTtcbiAgICB9ICBcbiAgfSxcbiAgb25LZXlJbnB1dDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIHF1YW50ID0gJChldnQuY3VycmVudFRhcmdldCkudmFsKCk7XG4gICAgY29uc29sZS5sb2cocXVhbnQpO1xuICAgIGlmKHF1YW50ID49IDApe1xuICAgICAgdGhpcy5tb2RlbC5zZXQoJ3F1YW50aXR5JywgcXVhbnQpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVBbGxUb3RhbCgpO1xuICAgIH1lbHNle1xuICAgICAgcXVhbnQgPSAwO1xuICAgICAgdGhpcy5tb2RlbC5zZXQoJ3F1YW50aXR5JywgcXVhbnQpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVBbGxUb3RhbCgpO1xuICAgIH1cbiAgfVxuICAsXG4gIHNldFRvdGFsOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIGNvbnN0IHByaWNlID0gbW9kZWwuZ2V0KCdwcmljZScpO1xuICAgIGNvbnN0IHF1YW50aXR5ID0gbW9kZWwuZ2V0KCdxdWFudGl0eScpO1xuICAgIGNvbnN0IHRvdCA9IE51bWJlcih0aGlzLmNhbGN1bGF0ZVRvdGFsKHByaWNlLCBxdWFudGl0eSkpO1xuICAgIG1vZGVsLnNldCgndG90YWwnLCB0b3QgKTtcbiAgfSxcbiAgY2FsY3VsYXRlVG90YWw6IGZ1bmN0aW9uKHByaWNlLCBxdWFudGl0eSkge1xuICAgIGNvbnN0IHRvdCA9KHByaWNlICogcXVhbnRpdHkpLnRvRml4ZWQoMik7XG4gICAgcmV0dXJuIHRvdDtcbiAgfSxcbiAgY2FsY3VsYXRlQWxsVG90YWw6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubW9kZWwuY29sbGVjdGlvbi50cmlnZ2VyKCdjYWxjdWxhdGVBbGxUaWNrZXQnKTtcbiAgfVxufSk7XG5cbk1hcmlvbmV0dGUuVGlja2V0ID0gTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3LmV4dGVuZCh7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpLFxuICBjbGFzc05hbWU6ICd0aWNrZXQtdGl0bGUtY29udGFpbmVyJyxcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHRoaXMuY29sbGVjdGlvbiA9IG9wdGlvbnMuY29sbGVjdGlvbjtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwnY2FsY3VsYXRlQWxsVGlja2V0JywgdGhpcy5jYWxjdWxhdGVBbGxUaWNrZXQpO1xuICB9LFxuICBjaGlsZFZpZXdDb250YWluZXI6ICcudGlja2V0LWFydGljbGVzLWNvbnRhaW5lcicsXG4gIGNoaWxkVmlldzogY2hpbGQsXG4gIGNhbGN1bGF0ZUFsbFRpY2tldDogZnVuY3Rpb24oKXtcbiAgICB2YXIgdG90YWxUaWNrZXQgPSAwO1xuICAgICQuZWFjaCh0aGlzLmNvbGxlY3Rpb24ubW9kZWxzLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgdG90YWxUaWNrZXQgKz0gTnVtYmVyKHZhbC5hdHRyaWJ1dGVzLnRvdGFsKTsgXG4gICAgICBcbiAgICB9KVxuICAgIHRoaXMuY29sbGVjdGlvbi50b3RhbFRpY2tldCA9ICh0b3RhbFRpY2tldCkudG9GaXhlZCgyKTtcbiAgICB2YXIgc3RyaW5nVG90ID0gJ1RPVEFMOiAkICcrdGhpcy5jb2xsZWN0aW9uLnRvdGFsVGlja2V0O1xuICAgICQoJy50aWNrZXQtdG90YWwtdGlja2V0JykudGV4dChzdHJpbmdUb3QpO1xuICB9XG59KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSBIYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzQ29tcGlsZXIudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDoge30sIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGkgY2xhc3M9XFxcIm1kbC1saXN0X19pdGVtIG1kbC1saXN0X19pdGVtXFxcIj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcIm1kbC1saXN0X19pdGVtLXByaW1hcnktY29udGVudCBhcnRpY2xlLXF1YW50aXR5LXRvQnV5XFxcIiBzdHlsZT1cXFwiXFxcIj5cXG5cXG4gICAgICAgICAgPGJ1dHRvbiBhY3Q9XFxcInJlbS10aWNrZXRcXFwiIGNsYXNzPVxcXCJ0aWNrZXQtYnV0dG9ucyBtZGwtYnV0dG9uIG1kbC1qcy1idXR0b24gbWRsLWJ1dHRvbi0tZmFiIG1kbC1qcy1yaXBwbGUtZWZmZWN0IG1kbC1idXR0b24tLW1pbmktZmFiIFxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcIm1hdGVyaWFsLWljb25zXFxcIj5yZW1vdmU8L2k+XFxuICAgICAgICAgIDwvYnV0dG9uPlxcblxcbiAgICAgICAgICAgIDxpbnB1dCBtaW49XFxcIjBcXFwiIHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcIm1kbC10ZXh0ZmllbGRfX2lucHV0IHRpY2tldC1pbnB1dFxcXCIgdmFsdWU9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5xdWFudGl0eSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucXVhbnRpdHkgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInF1YW50aXR5XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxuICAgICAgICAgIFxcbiAgICAgICAgICA8YnV0dG9uIGFjdD1cXFwiYWRkLXRpY2tldFxcXCIgY2xhc3M9XFxcInRpY2tldC1idXR0b25zIG1kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtYnV0dG9uLS1mYWIgbWRsLWpzLXJpcHBsZS1lZmZlY3QgbWRsLWJ1dHRvbi0tbWluaS1mYWIgXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnNcXFwiPmFkZDwvaT5cXG4gICAgICAgICAgPC9idXR0b24+XFxuXFxuICAgIDwvc3Bhbj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcIm1kbC1saXN0X19pdGVtLXByaW1hcnktY29udGVudCBhcnRpY2xlLXF1YW50aXR5LXRvQnV5XFxcIiBzdHlsZT1cXFwiXFxcIj5cXG4gICAgICA8c3BhbiBzdHlsZT1cXFwiXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxuICAgIDwvc3Bhbj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcIm1kbC1saXN0X19pdGVtLXByaW1hcnktY29udGVudCBhcnRpY2xlLXRpY2tldC11bml0XFxcIiBzdHlsZT1cXFwiXFxcIj4gXFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInRpY2tldC11bml0LXByaWNlXFxcIj4kXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwicHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcbiAgICA8L3NwYW4+XFxuXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbS1wcmltYXJ5LWNvbnRlbnQgdGlja2V0LXRvdGFsLXVuaXRcXFwiIHN0eWxlPVxcXCJcXFwiPjxzcGFuIGNsYXNzPVxcXCJ0aWNrZXQtdG90YWwtdW5pXFxcIj4kXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRvdGFsIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50b3RhbCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidG90YWxcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcbiAgICAgIFxcbiAgICA8L3NwYW4+XFxuICA8L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIjxsaSBjbGFzcz1cXFwibWRsLWxpc3RfX2l0ZW0gbWRsLWxpc3RfX2l0ZW0gXFxcIj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcIm1kbC1saXN0X19pdGVtLXByaW1hcnktY29udGVudCB0aWNrZXQtdGl0bGVzIHRpdGxlLXRpY2tldC1xdWFudGl0eVxcXCIgc3R5bGU9XFxcIlxcXCI+XFxuXHRcdCAgQ2FudGlkYWRcXG4gICAgPC9zcGFuPlxcbiAgICA8c3BhbiBjbGFzcz1cXFwibWRsLWxpc3RfX2l0ZW0tcHJpbWFyeS1jb250ZW50IGFydGljbGUtcXVhbnRpdHktdG9CdXkgXFxcIiBzdHlsZT1cXFwiXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwidGlja2V0LXRpdGxlc1xcXCIgc3R5bGU9XFxcIlxcXCI+Tm9tYnJlPC9zcGFuPlxcbiAgICA8L3NwYW4+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbS1wcmltYXJ5LWNvbnRlbnQgYXJ0aWNsZS10aWNrZXQtdW5pdFxcXCIgc3R5bGU9XFxcIlxcXCI+IFxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0aWNrZXQtdW5pdC1wcmljZSB0aWNrZXQtdGl0bGVzXFxcIj4kIEMvVTwvc3Bhbj5cXG4gICAgPC9zcGFuPlxcblxcbiAgICA8c3BhbiBjbGFzcz1cXFwibWRsLWxpc3RfX2l0ZW0tcHJpbWFyeS1jb250ZW50IHRpY2tldC10b3RhbC11bml0XFxcIiBzdHlsZT1cXFwiXFxcIj48c3BhbiBjbGFzcz1cXFwidGlja2V0LXRpdGxlcyB0aWNrZXQtdG90YWwtdW5pXFxcIj5Ub3RhbDwvc3Bhbj5cXG4gICAgICBcXG4gICAgPC9zcGFuPlxcbiAgPC9saT5cXG5cXG5cXG5cXG48dWwgY2xhc3M9J21kbC1saXN0IHRpY2tldC1hcnRpY2xlcy1jb250YWluZXInPlxcblxcbjwvdWw+XFxuPGZvb3RlciBjbGFzcz1cXFwiZm9vdGVyLXRpY2tldHNcXFwiPlxcblx0PHNwYW4gY2xhc3M9XFxcInRpY2tldC10b3RhbC10aWNrZXRcXFwiPlRPVEFMOiAkIDAuMDwvc3Bhbj5cXG48L2Zvb3Rlcj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuIl19
