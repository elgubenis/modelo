```javascript
	historyList = [
    {
      createdAt: '2016-02-28T13:47:04.491Z',
      total: 120,
      order_no: 1
    },
    {
      createdAt: '2016-02-28T13:47:04.491Z',
      total: 150,
      order_no: 2
    },
    {
      createdAt: '2016-02-28T13:47:04.491Z',
      total: 190,
      order_no: 3
    }
  ];
  const collection = new Backbone.Collection(historyList);
  const historyListView = new Marionette.HistoryList({
    collection: collection
  });
  layout.getRegion('preview').show(historyListView);
```