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
        checkCall: function(){
          console.log('some message from callback');
        }
      };
      const form-confirm = new Marionette.form(myObject);
      const layout = new LayoutView();
      layout.getRegion('preview').show(form-confirm);

```
