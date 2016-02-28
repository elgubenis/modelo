/* globals Marionette */
'use strict';
var child = Marionette.ItemView.extend({
  template: require('itemsArticlesToBuy.hbs'),
  modelEvents: {
    'change': 'render'
  },
  initialize: function(options) {
    console.log('initialize item');
    console.log(options.model);
    this.model = options.model;
  },
  onRender: function(){
    this.setTotal(this.model);
  },
  onShow: function(){
    this.calculateAllTotal();
  },
  events:{
    'click .ticket-buttons': 'onClickButtons',
    'change .ticket-input': 'onKeyInput'
  },
  onClickButtons: function(evt) {
    const ev = $(evt.currentTarget).attr("act");
    if(ev =='rem-ticket'){
     var quant = Number(this.model.get('quantity'));
     quant -= 1;
     if(quant >= 0 ){
       this.model.set('quantity', quant);
       this.calculateAllTotal();
     }
    }
    if(ev == 'add-ticket') {
      var quant = Number(this.model.get('quantity'));
      quant += 1;
      this.model.set('quantity', quant);
      this.calculateAllTotal();
    }  
  },
  onKeyInput: function(evt) {
    var quant = $(evt.currentTarget).val();
    console.log(quant);
    if(quant >= 0){
      this.model.set('quantity', quant);
      this.calculateAllTotal();
    }else{
      quant = 0;
      this.model.set('quantity', quant);
      this.calculateAllTotal();
    }
  }
  ,
  setTotal: function(model) {
    const price = model.get('price');
    const quantity = model.get('quantity');
    const tot = Number(this.calculateTotal(price, quantity));
    model.set('total', tot );
  },
  calculateTotal: function(price, quantity) {
    const tot =(price * quantity).toFixed(2);
    return tot;
  },
  calculateAllTotal: function() {
    this.model.collection.trigger('calculateAllTicket');
  }
});

Marionette.Ticket = Marionette.CompositeView.extend({
  template: require('./template.hbs'),
  className: 'ticket-title-container',
  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection,'calculateAllTicket', this.calculateAllTicket);
  },
  childViewContainer: '.ticket-articles-container',
  childView: child,
  calculateAllTicket: function(){
    var totalTicket = 0;
    $.each(this.collection.models, function(key, val) {
      totalTicket += Number(val.attributes.total); 
      
    })
    this.collection.totalTicket = (totalTicket).toFixed(2);
    console.log(this.collection.totalTicket);
    var stringTot = 'TOTAL: $ '+this.collection.totalTicket;
    $('.ticket-total-ticket').text(stringTot);
    if(this.collection.discount){
      console.log('hay descuento');
      this.applyDiscount(this.collection);
    }
  },
  onShow: function(){
  },
  applyDiscount: function(collection){
    $('.ticket-discount').removeClass('hidden');
    $('.ticket-discount-line').removeClass('hidden');
    $('.ticket-real-price').removeClass('hidden');

    var descuento =(this.collection.totalTicket*(('.'+collection.discount))).toFixed(2);
    console.log(descuento); 
    $('.ticket-discount').text(' Descuento -'+collection.discount+' %');
    console.log(this.collection.totalTicket - descuento);
    var desc = this.collection.totalTicket - descuento;
    $('.ticket-real-price').text('TOTAL: $'+desc.toFixed(2));
    $('.ticket-total-ticket').text('$'+this.collection.totalTicket)
    $('.ticket-real-price').addClass('ticket-label-new');


    
  }
});
