## @modelo/confirmationView

```html
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
```

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
  const confirmationView = new Marionette.Modelo.ConfirmationView({});
  const layout = new LayoutView();
  layout.getRegion('preview').show(confirmationView);
</script>
```
