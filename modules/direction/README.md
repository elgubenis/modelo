```js
  const directionView = new Marionette.DirectionView({
    model: new Backbone.Model(),
    onClick() {
      console.log(this.model.get('direction'));
    }
  });
  const layout = new LayoutView();
  layout.getRegion('preview').show(directionView);
```

inside the onClick event, the scope is the views scope itself,
the model has a direction attribute with the entered direction.