```javascript
	const LayoutView = Marionette.LayoutView.extend({
	template: false,
	el: 'body',
	regions: {
	  preview: '#module'
	},
	initialize() {
	  this.render();
	},
	});

	const layout = new LayoutView();
	articleList = [
	{
	  name: 'Corona',
	  description: '4.9%',
	  price: 2.05,
	  stars: 4.9,
	  quantity: 0,
	  image: 'http://vignette4.wikia.nocookie.net/beer/images/6/6b/Corona.jpg/revision/latest?cb=20130322234121'
	},
	{
	  name: 'Victoria',
	  description: '4.9%',
	  price: 2.05,
	  stars: 4.5,
	  quantity: 0,
	  image: 'http://www.tragos-tragos.com/wp-content/uploads/2012/09/cerveza-victoria.jpg'
	}
	];
	const collection = new Backbone.Collection(articleList);
	const articleListView = new Marionette.ArticleList({
	collection: collection
	});
	layout.getRegion('preview').show(articleListView);
``