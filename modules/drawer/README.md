```html
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
    </header>
    <div id='module' class='mdl-layout__drawer'></div>
  </div>
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
  const drawerView = new Marionette.Modelo.DrawerView({
    menu: [
      { label: 'Usuario', href: '/user' },
      { label: 'Pedidos', href: '/orders' },
      { label: 'Eventos', href: '/events'},
    ],
    user: Backbone.Model()
    mlLink: '/mililiters',
    full: true,
  });
  const layout = new LayoutView();
  layout.getRegion('preview').show(drawerView);
</script>
```

- mlLink (string) link que se le pone la botella
- full (boolean) indica si la botella esta llena
