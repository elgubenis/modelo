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
      
      var articlesToBuy = [
        {
          name: 'Corona',
          description: '4.9%',
          price: 2.05,
          stars: 4.9,
          quantity: 2,
          image: 'http://vignette4.wikia.nocookie.net/beer/images/6/6b/Corona.jpg/revision/latest?cb=20130322234121',
        },{
          name: 'Corona',
          description: '4.9%',
          price: 2.05,
          stars: 4.9,
          quantity: 2,
          image: 'http://vignette4.wikia.nocookie.net/beer/images/6/6b/Corona.jpg/revision/latest?cb=20130322234121',
        },{
          name: 'Corona',
          description: '4.9%',
          price: 2.05,
          stars: 4.9,
          quantity: 2,
          image: 'http://vignette4.wikia.nocookie.net/beer/images/6/6b/Corona.jpg/revision/latest?cb=20130322234121',
        }
      ];

      var myObject={
        collection: new Backbone.Collection(articlesToBuy)
      };

      const ticketView = new Marionette.Ticket(myObject);
      const layout = new LayoutView();
      layout.getRegion('preview').show(ticketView);

```
