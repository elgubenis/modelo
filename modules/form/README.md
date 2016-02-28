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
      var myObject={
         text: 'Eres de edad?',
         buttons: [
           {
             label: 'SI',
             onClick: function() {
               alert('SI');
             }
           },
           {
             label: 'NO',
             onClick: function() {
               alert('NO');
             }
           }
         ]
       };

       
      const directionView = new Marionette.Form(myObject);
      const layout = new LayoutView();
      layout.getRegion('preview').show(directionView);

```
