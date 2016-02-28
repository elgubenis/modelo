```javascript  
  const layout = new LayoutView();
  awardList = [
    {
      name: 'Not a virgin',
      icon: 'check',
      hasAward: true
    },
    {
      name: 'tarjeta de cedito usado',
      icon: 'credit_card',
      hasAward: true
    },
    {
      name: 'paypal usado',
      iconClass: 'fa fa-fw fa-cc-paypal',
      hasAward: true
    },
    {
      name: 'efectivo usado',
      iconClass: 'fa fa-fw fa-money',
      hasAward: true
    },
    {
      name: 'aplicacion compartida',
      icon: 'android',
      hasAward: true
    },
    {
      name: 'compartida en facebook',
      iconClass: 'fa fa-fw fa-facebook',
      hasAward: true
    },
    {
      name: 'compartida en twitter',
      iconClass: 'fa fa-fw fa-twitter',
      hasAward: true
    },
    {
      name: 'compartida en google +',
      iconClass: 'fa fa-fw fa-google-plus',
      hasAward: true
    },
    {
      name: 'chela tomada esta semana',
      iconClass: 'fa fa-fw fa-beer',
      hasAward: true
    }
    ,
    {
      name: 'chela rated',
      iconClass: 'fa fa-fw fa-star',
      hasAward: true
    }
  ];
  const collection = new Backbone.Collection(awardList);
  const awardsView = new Marionette.Awards({
    collection: collection
  });
  layout.getRegion('preview').show(awardsView);
```