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
    console.log(this.collection.totalTicket);
    var stringTot = 'TOTAL: $ ' + this.collection.totalTicket;
    $('.ticket-total-ticket').text(stringTot);
    if (this.collection.discount) {
      console.log('hay descuento');
      this.applyDiscount(this.collection);
    }
  },
  onShow: function onShow() {},
  applyDiscount: function applyDiscount(collection) {
    $('.ticket-discount').removeClass('hidden');
    $('.ticket-discount-line').removeClass('hidden');
    $('.ticket-real-price').removeClass('hidden');

    var descuento = (this.collection.totalTicket * ('.' + collection.discount)).toFixed(2);
    console.log(descuento);
    $('.ticket-discount').text(' Descuento -' + collection.discount + ' %');
    console.log(this.collection.totalTicket - descuento);
    var desc = this.collection.totalTicket - descuento;
    $('.ticket-real-price').text('TOTAL: $' + desc.toFixed(2));
    $('.ticket-total-ticket').text('$' + this.collection.totalTicket);
    $('.ticket-real-price').addClass('ticket-label-new');
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
    return "<li class=\"mdl-list__item mdl-list__item \">\n    <span class=\"mdl-list__item-primary-content ticket-titles title-ticket-quantity\" style=\"\">\n		  Cantidad\n    </span>\n    <span class=\"mdl-list__item-primary-content article-quantity-toBuy \" style=\"\">\n      <span class=\"ticket-titles\" style=\"\">Nombre</span>\n    </span>\n    <span class=\"mdl-list__item-primary-content article-ticket-unit\" style=\"\"> \n      <span class=\"ticket-unit-price ticket-titles\">$ C/U</span>\n    </span>\n\n    <span class=\"mdl-list__item-primary-content ticket-total-unit\" style=\"\"><span class=\"ticket-titles ticket-total-uni\">Total</span>\n      \n    </span>\n  </li>\n\n\n\n<ul class='mdl-list ticket-articles-container'>\n\n</ul>\n<footer class=\"footer-tickets\">\n	<span class=\"ticket-total-ticket\">TOTAL: $ 0.0</span>\n  <span class=\"ticket-discount hidden\"></span>\n  <div class=\"ticket-discount-line hidden\" style=\" background-color: #ff4081; \n  height: 1px; width:20%;\"></div>\n  <span class=\"ticket-real-price hidden\"></span>\n</footer>";
},"useData":true});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvaXRlbXNBcnRpY2xlc1RvQnV5LmhicyIsInNyYy90ZW1wbGF0ZS5oYnMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQ0E7O0FBQ0EsSUFBSSxRQUFRLFdBQVcsUUFBWCxDQUFvQixNQUFwQixDQUEyQjtBQUNyQyxZQUFVLFFBQVEsd0JBQVIsQ0FBVjtBQUNBLGVBQWE7QUFDWCxjQUFVLFFBQVY7R0FERjtBQUdBLGNBQVksb0JBQVMsT0FBVCxFQUFrQjtBQUM1QixZQUFRLEdBQVIsQ0FBWSxpQkFBWixFQUQ0QjtBQUU1QixZQUFRLEdBQVIsQ0FBWSxRQUFRLEtBQVIsQ0FBWixDQUY0QjtBQUc1QixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsQ0FIZTtHQUFsQjtBQUtaLFlBQVUsb0JBQVU7QUFDbEIsU0FBSyxRQUFMLENBQWMsS0FBSyxLQUFMLENBQWQsQ0FEa0I7R0FBVjtBQUdWLFVBQVEsa0JBQVU7QUFDaEIsU0FBSyxpQkFBTCxHQURnQjtHQUFWO0FBR1IsVUFBTztBQUNMLDZCQUF5QixnQkFBekI7QUFDQSw0QkFBd0IsWUFBeEI7R0FGRjtBQUlBLGtCQUFnQix3QkFBUyxHQUFULEVBQWM7QUFDNUIsUUFBTSxLQUFLLEVBQUUsSUFBSSxhQUFKLENBQUYsQ0FBcUIsSUFBckIsQ0FBMEIsS0FBMUIsQ0FBTCxDQURzQjtBQUU1QixRQUFHLE1BQUssWUFBTCxFQUFrQjtBQUNwQixVQUFJLFFBQVEsT0FBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsVUFBZixDQUFQLENBQVIsQ0FEZ0I7QUFFcEIsZUFBUyxDQUFULENBRm9CO0FBR3BCLFVBQUcsU0FBUyxDQUFULEVBQVk7QUFDYixhQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsVUFBZixFQUEyQixLQUEzQixFQURhO0FBRWIsYUFBSyxpQkFBTCxHQUZhO09BQWY7S0FIRDtBQVFBLFFBQUcs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Iiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWxzIE1hcmlvbmV0dGUgKi9cbid1c2Ugc3RyaWN0JztcbnZhciBjaGlsZCA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJ2l0ZW1zQXJ0aWNsZXNUb0J1eS5oYnMnKSxcbiAgbW9kZWxFdmVudHM6IHtcbiAgICAnY2hhbmdlJzogJ3JlbmRlcidcbiAgfSxcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGNvbnNvbGUubG9nKCdpbml0aWFsaXplIGl0ZW0nKTtcbiAgICBjb25zb2xlLmxvZyhvcHRpb25zLm1vZGVsKTtcbiAgICB0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcbiAgfSxcbiAgb25SZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5zZXRUb3RhbCh0aGlzLm1vZGVsKTtcbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbigpe1xuICAgIHRoaXMuY2FsY3VsYXRlQWxsVG90YWwoKTtcbiAgfSxcbiAgZXZlbnRzOntcbiAgICAnY2xpY2sgLnRpY2tldC1idXR0b25zJzogJ29uQ2xpY2tCdXR0b25zJyxcbiAgICAnY2hhbmdlIC50aWNrZXQtaW5wdXQnOiAnb25LZXlJbnB1dCdcbiAgfSxcbiAgb25DbGlja0J1dHRvbnM6IGZ1bmN0aW9uKGV2dCkge1xuICAgIGNvbnN0IGV2ID0gJChldnQuY3VycmVudFRhcmdldCkuYXR0cihcImFjdFwiKTtcbiAgICBpZihldiA9PSdyZW0tdGlja2V0Jyl7XG4gICAgIHZhciBxdWFudCA9IE51bWJlcih0aGlzLm1vZGVsLmdldCgncXVhbnRpdHknKSk7XG4gICAgIHF1YW50IC09IDE7XG4gICAgIGlmKHF1YW50ID49IDAgKXtcbiAgICAgICB0aGlzLm1vZGVsLnNldCgncXVhbnRpdHknLCBxdWFudCk7XG4gICAgICAgdGhpcy5jYWxjdWxhdGVBbGxUb3RhbCgpO1xuICAgICB9XG4gICAgfVxuICAgIGlmKGV2ID09ICdhZGQtdGlja2V0Jykge1xuICAgICAgdmFyIHF1YW50ID0gTnVtYmVyKHRoaXMubW9kZWwuZ2V0KCdxdWFudGl0eScpKTtcbiAgICAgIHF1YW50ICs9IDE7XG4gICAgICB0aGlzLm1vZGVsLnNldCgncXVhbnRpdHknLCBxdWFudCk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUFsbFRvdGFsKCk7XG4gICAgfSAgXG4gIH0sXG4gIG9uS2V5SW5wdXQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciBxdWFudCA9ICQoZXZ0LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xuICAgIGNvbnNvbGUubG9nKHF1YW50KTtcbiAgICBpZihxdWFudCA+PSAwKXtcbiAgICAgIHRoaXMubW9kZWwuc2V0KCdxdWFudGl0eScsIHF1YW50KTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQWxsVG90YWwoKTtcbiAgICB9ZWxzZXtcbiAgICAgIHF1YW50ID0gMDtcbiAgICAgIHRoaXMubW9kZWwuc2V0KCdxdWFudGl0eScsIHF1YW50KTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQWxsVG90YWwoKTtcbiAgICB9XG4gIH1cbiAgLFxuICBzZXRUb3RhbDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICBjb25zdCBwcmljZSA9IG1vZGVsLmdldCgncHJpY2UnKTtcbiAgICBjb25zdCBxdWFudGl0eSA9IG1vZGVsLmdldCgncXVhbnRpdHknKTtcbiAgICBjb25zdCB0b3QgPSBOdW1iZXIodGhpcy5jYWxjdWxhdGVUb3RhbChwcmljZSwgcXVhbnRpdHkpKTtcbiAgICBtb2RlbC5zZXQoJ3RvdGFsJywgdG90ICk7XG4gIH0sXG4gIGNhbGN1bGF0ZVRvdGFsOiBmdW5jdGlvbihwcmljZSwgcXVhbnRpdHkpIHtcbiAgICBjb25zdCB0b3QgPShwcmljZSAqIHF1YW50aXR5KS50b0ZpeGVkKDIpO1xuICAgIHJldHVybiB0b3Q7XG4gIH0sXG4gIGNhbGN1bGF0ZUFsbFRvdGFsOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm1vZGVsLmNvbGxlY3Rpb24udHJpZ2dlcignY2FsY3VsYXRlQWxsVGlja2V0Jyk7XG4gIH1cbn0pO1xuXG5NYXJpb25ldHRlLlRpY2tldCA9IE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldy5leHRlbmQoe1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKSxcbiAgY2xhc3NOYW1lOiAndGlja2V0LXRpdGxlLWNvbnRhaW5lcicsXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBvcHRpb25zLmNvbGxlY3Rpb247XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ2NhbGN1bGF0ZUFsbFRpY2tldCcsIHRoaXMuY2FsY3VsYXRlQWxsVGlja2V0KTtcbiAgfSxcbiAgY2hpbGRWaWV3Q29udGFpbmVyOiAnLnRpY2tldC1hcnRpY2xlcy1jb250YWluZXInLFxuICBjaGlsZFZpZXc6IGNoaWxkLFxuICBjYWxjdWxhdGVBbGxUaWNrZXQ6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHRvdGFsVGlja2V0ID0gMDtcbiAgICAkLmVhY2godGhpcy5jb2xsZWN0aW9uLm1vZGVscywgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgIHRvdGFsVGlja2V0ICs9IE51bWJlcih2YWwuYXR0cmlidXRlcy50b3RhbCk7IFxuICAgICAgXG4gICAgfSlcbiAgICB0aGlzLmNvbGxlY3Rpb24udG90YWxUaWNrZXQgPSAodG90YWxUaWNrZXQpLnRvRml4ZWQoMik7XG4gICAgY29uc29sZS5sb2codGhpcy5jb2xsZWN0aW9uLnRvdGFsVGlja2V0KTtcbiAgICB2YXIgc3RyaW5nVG90ID0gJ1RPVEFMOiAkICcrdGhpcy5jb2xsZWN0aW9uLnRvdGFsVGlja2V0O1xuICAgICQoJy50aWNrZXQtdG90YWwtdGlja2V0JykudGV4dChzdHJpbmdUb3QpO1xuICAgIGlmKHRoaXMuY29sbGVjdGlvbi5kaXNjb3VudCl7XG4gICAgICBjb25zb2xlLmxvZygnaGF5IGRlc2N1ZW50bycpO1xuICAgICAgdGhpcy5hcHBseURpc2NvdW50KHRoaXMuY29sbGVjdGlvbik7XG4gICAgfVxuICB9LFxuICBvblNob3c6IGZ1bmN0aW9uKCl7XG4gIH0sXG4gIGFwcGx5RGlzY291bnQ6IGZ1bmN0aW9uKGNvbGxlY3Rpb24pe1xuICAgICQoJy50aWNrZXQtZGlzY291bnQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgJCgnLnRpY2tldC1kaXNjb3VudC1saW5lJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICQoJy50aWNrZXQtcmVhbC1wcmljZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblxuICAgIHZhciBkZXNjdWVudG8gPSh0aGlzLmNvbGxlY3Rpb24udG90YWxUaWNrZXQqKCgnLicrY29sbGVjdGlvbi5kaXNjb3VudCkpKS50b0ZpeGVkKDIpO1xuICAgIGNvbnNvbGUubG9nKGRlc2N1ZW50byk7IFxuICAgICQoJy50aWNrZXQtZGlzY291bnQnKS50ZXh0KCcgRGVzY3VlbnRvIC0nK2NvbGxlY3Rpb24uZGlzY291bnQrJyAlJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5jb2xsZWN0aW9uLnRvdGFsVGlja2V0IC0gZGVzY3VlbnRvKTtcbiAgICB2YXIgZGVzYyA9IHRoaXMuY29sbGVjdGlvbi50b3RhbFRpY2tldCAtIGRlc2N1ZW50bztcbiAgICAkKCcudGlja2V0LXJlYWwtcHJpY2UnKS50ZXh0KCdUT1RBTDogJCcrZGVzYy50b0ZpeGVkKDIpKTtcbiAgICAkKCcudGlja2V0LXRvdGFsLXRpY2tldCcpLnRleHQoJyQnK3RoaXMuY29sbGVjdGlvbi50b3RhbFRpY2tldClcbiAgICAkKCcudGlja2V0LXJlYWwtcHJpY2UnKS5hZGRDbGFzcygndGlja2V0LWxhYmVsLW5ldycpO1xuXG5cbiAgICBcbiAgfVxufSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IHt9LCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpIGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbSBtZGwtbGlzdF9faXRlbVxcXCI+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbS1wcmltYXJ5LWNvbnRlbnQgYXJ0aWNsZS1xdWFudGl0eS10b0J1eVxcXCIgc3R5bGU9XFxcIlxcXCI+XFxuXFxuICAgICAgICAgIDxidXR0b24gYWN0PVxcXCJyZW0tdGlja2V0XFxcIiBjbGFzcz1cXFwidGlja2V0LWJ1dHRvbnMgbWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1idXR0b24tLWZhYiBtZGwtanMtcmlwcGxlLWVmZmVjdCBtZGwtYnV0dG9uLS1taW5pLWZhYiBcXFwiPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJtYXRlcmlhbC1pY29uc1xcXCI+cmVtb3ZlPC9pPlxcbiAgICAgICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICAgICAgICA8aW5wdXQgbWluPVxcXCIwXFxcIiB0eXBlPVxcXCJudW1iZXJcXFwiIGNsYXNzPVxcXCJtZGwtdGV4dGZpZWxkX19pbnB1dCB0aWNrZXQtaW5wdXRcXFwiIHZhbHVlPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMucXVhbnRpdHkgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnF1YW50aXR5IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJxdWFudGl0eVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcbiAgICAgICAgICBcXG4gICAgICAgICAgPGJ1dHRvbiBhY3Q9XFxcImFkZC10aWNrZXRcXFwiIGNsYXNzPVxcXCJ0aWNrZXQtYnV0dG9ucyBtZGwtYnV0dG9uIG1kbC1qcy1idXR0b24gbWRsLWJ1dHRvbi0tZmFiIG1kbC1qcy1yaXBwbGUtZWZmZWN0IG1kbC1idXR0b24tLW1pbmktZmFiIFxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcIm1hdGVyaWFsLWljb25zXFxcIj5hZGQ8L2k+XFxuICAgICAgICAgIDwvYnV0dG9uPlxcblxcbiAgICA8L3NwYW4+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbS1wcmltYXJ5LWNvbnRlbnQgYXJ0aWNsZS1xdWFudGl0eS10b0J1eVxcXCIgc3R5bGU9XFxcIlxcXCI+XFxuICAgICAgPHNwYW4gc3R5bGU9XFxcIlxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcbiAgICA8L3NwYW4+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbS1wcmltYXJ5LWNvbnRlbnQgYXJ0aWNsZS10aWNrZXQtdW5pdFxcXCIgc3R5bGU9XFxcIlxcXCI+IFxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0aWNrZXQtdW5pdC1wcmljZVxcXCI+JFwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXG4gICAgPC9zcGFuPlxcblxcbiAgICA8c3BhbiBjbGFzcz1cXFwibWRsLWxpc3RfX2l0ZW0tcHJpbWFyeS1jb250ZW50IHRpY2tldC10b3RhbC11bml0XFxcIiBzdHlsZT1cXFwiXFxcIj48c3BhbiBjbGFzcz1cXFwidGlja2V0LXRvdGFsLXVuaVxcXCI+JFwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50b3RhbCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudG90YWwgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRvdGFsXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXG4gICAgICBcXG4gICAgPC9zcGFuPlxcbiAgPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IEhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCI8bGkgY2xhc3M9XFxcIm1kbC1saXN0X19pdGVtIG1kbC1saXN0X19pdGVtIFxcXCI+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbS1wcmltYXJ5LWNvbnRlbnQgdGlja2V0LXRpdGxlcyB0aXRsZS10aWNrZXQtcXVhbnRpdHlcXFwiIHN0eWxlPVxcXCJcXFwiPlxcblx0XHQgIENhbnRpZGFkXFxuICAgIDwvc3Bhbj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcIm1kbC1saXN0X19pdGVtLXByaW1hcnktY29udGVudCBhcnRpY2xlLXF1YW50aXR5LXRvQnV5IFxcXCIgc3R5bGU9XFxcIlxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInRpY2tldC10aXRsZXNcXFwiIHN0eWxlPVxcXCJcXFwiPk5vbWJyZTwvc3Bhbj5cXG4gICAgPC9zcGFuPlxcbiAgICA8c3BhbiBjbGFzcz1cXFwibWRsLWxpc3RfX2l0ZW0tcHJpbWFyeS1jb250ZW50IGFydGljbGUtdGlja2V0LXVuaXRcXFwiIHN0eWxlPVxcXCJcXFwiPiBcXG4gICAgICA8c3BhbiBjbGFzcz1cXFwidGlja2V0LXVuaXQtcHJpY2UgdGlja2V0LXRpdGxlc1xcXCI+JCBDL1U8L3NwYW4+XFxuICAgIDwvc3Bhbj5cXG5cXG4gICAgPHNwYW4gY2xhc3M9XFxcIm1kbC1saXN0X19pdGVtLXByaW1hcnktY29udGVudCB0aWNrZXQtdG90YWwtdW5pdFxcXCIgc3R5bGU9XFxcIlxcXCI+PHNwYW4gY2xhc3M9XFxcInRpY2tldC10aXRsZXMgdGlja2V0LXRvdGFsLXVuaVxcXCI+VG90YWw8L3NwYW4+XFxuICAgICAgXFxuICAgIDwvc3Bhbj5cXG4gIDwvbGk+XFxuXFxuXFxuXFxuPHVsIGNsYXNzPSdtZGwtbGlzdCB0aWNrZXQtYXJ0aWNsZXMtY29udGFpbmVyJz5cXG5cXG48L3VsPlxcbjxmb290ZXIgY2xhc3M9XFxcImZvb3Rlci10aWNrZXRzXFxcIj5cXG5cdDxzcGFuIGNsYXNzPVxcXCJ0aWNrZXQtdG90YWwtdGlja2V0XFxcIj5UT1RBTDogJCAwLjA8L3NwYW4+XFxuICA8c3BhbiBjbGFzcz1cXFwidGlja2V0LWRpc2NvdW50IGhpZGRlblxcXCI+PC9zcGFuPlxcbiAgPGRpdiBjbGFzcz1cXFwidGlja2V0LWRpc2NvdW50LWxpbmUgaGlkZGVuXFxcIiBzdHlsZT1cXFwiIGJhY2tncm91bmQtY29sb3I6ICNmZjQwODE7IFxcbiAgaGVpZ2h0OiAxcHg7IHdpZHRoOjIwJTtcXFwiPjwvZGl2PlxcbiAgPHNwYW4gY2xhc3M9XFxcInRpY2tldC1yZWFsLXByaWNlIGhpZGRlblxcXCI+PC9zcGFuPlxcbjwvZm9vdGVyPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG4iXX0=
