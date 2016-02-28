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
      var articleList = [
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

      var myObject={
        collection: new Backbone.Collection(articleList)
      };

      const searchView = new Marionette.Search(myObject);
      const layout = new LayoutView();
      layout.getRegion('preview').show(searchView);
       const channel = Backbone.Radio.channel('header');
      channel.trigger('title', 'Pedidos');

```
lanzo el trigger 

```javascript
this.collection.trigger('search', value);


```

espero el trigger que indica que se realizo algo y yo pueda liberar el flag para poder realizar otra busqueda 
```javascript
searchView.trigger('searched');

```