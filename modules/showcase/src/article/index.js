var Article = Marionette.ItemView.extend({
  template: require('./templates/article.hbs'),
  className: 'mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone',
  events: {
  	'click .add-article': 'addArticle',
  	'click .remove-article': 'removeArticle'
  },
  modelEvents: {
  	'change:quantity': 'renderCurrentPrice'
  },
  initialize: function() {
    var currenyQuantity = this.model.get('quantity');
    if (currenyQuantity===null || currenyQuantity === undefined){
  	  var quantity = 0;
  	  this.model.set('quantity', quantity);
    }
  	this.setPrice()
  },
  setPrice: function() {
  	var quantity = this.model.get('quantity');
  	var price = this.model.get('price');
    var discount = this.model.collection.discount;
    if (discount!==null && discount!==undefined) {
      price -= (price*discount)/100;
    }
  	var currentPrice = (price * quantity).toFixed(2);
  	this.model.set('currentPrice', currentPrice);
  },
  renderCurrentPrice: function() {
  	this.setPrice();
  	this.$el.find('.current-price').html('$ '+this.model.get('currentPrice'));
  	this.$el.find('.article-quantity').val(this.model.get('quantity'));
  },
  addArticle: function() {
  	var currentQuantity = this.model.get('quantity');
  	currentQuantity++;
  	this.model.set('quantity', currentQuantity);
  },
  removeArticle: function() {
  	var currentQuantity = this.model.get('quantity');
  	if (currentQuantity > 0) {
  		currentQuantity--;
  		this.model.set('quantity', currentQuantity);
  	}
  }
});

module.exports = Article