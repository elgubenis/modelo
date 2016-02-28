```javascript
	const layout = new LayoutView();
	eventList = [
	{
	  name: 'Formula 1',
	  description: 'Evento sobre la Formula1',
	  discount: 50,
	  image: 'http://formula1.autobild.es/sites/formula1.autobild.es/files/f1_mexico_cartel.png'
	},
	{
	  name: 'White noise',
	  description: 'Evento Beerhouse',
	  discount: 5,
	  image: 'http://www.beerhouse.co.za/wp-content/uploads/2014/04/BH-Silent-Disco-4-LOGOS-only-V2-Logo-colour-shadows.jpg'
	},
	{
	  name: 'White noise',
	  description: 'Evento Beerhouse',
	  image: 'http://beerhouseia.com/wp-content/uploads/2016/01/Beerhouse-Logo-Dark.jpg'
	}
	];
	const collection = new Backbone.Collection(eventList);
	const eventsListView = new Marionette.EventsList({
	collection: collection
	});
	layout.getRegion('preview').show(eventsListView);
```