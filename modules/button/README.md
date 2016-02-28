```js
  <script>
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

    const buttonView = new Marionette.Modelo.Button({
      addOrder() {
        console.log('XD');
      },
      addSchedule() {
        console.log('):');
      },
    });
    const layout = new LayoutView();
    layout.getRegion('preview').show(buttonView);
  </script>
```

## Prerequisites

```html
  <link rel="stylesheet" href="mdl-speed-dial.css">
  <script src="mdl-speed-dial.js"></script>
```
