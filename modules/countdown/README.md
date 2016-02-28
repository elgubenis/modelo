```javascript  
  const layout = new LayoutView();
  const countdown = new Marionette.Countdown({
    duration: 5
  });
  layout.getRegion('preview').show(countdown);
```