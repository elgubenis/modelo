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
    const mlView = new Marionette.Modelo.Mililiters({full: true, success: 'Boletos de F1', fail: 'Sigue acumulando puntos'});
    const layout = new LayoutView();
    layout.getRegion('preview').show(mlView);
  </script>
```

- full (boolean) Indica si la botella esta vacia
- success (string) Pinta el 'premio'
- fail (string) Pinta un mensaje para incentivar al usuario a seguir
