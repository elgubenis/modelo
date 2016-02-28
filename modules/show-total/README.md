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
  total = 100
  const showTotal = new Marionette.ShowTotal({
    total: total
  });
  layout.getRegion('preview').show(showTotal);
```