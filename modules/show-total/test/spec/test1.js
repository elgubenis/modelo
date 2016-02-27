/* globals Marionette, _, $ */

'use strict';

const LayoutView = Marionette.LayoutView.extend({
  template: _.template('<div id="region1">region1-placeholder</div>'),
  el: '#fixtures',
  regions: {
    region1: '#region1',
  },
  initialize() {
    this.render();
  },
});

describe('Create a Marionette LayoutView', function () {
  let layout;
  it('should show a region used for fixtures', function () {
    layout = new LayoutView();
    expect(layout.$el.html()).to.contain('region1-placeholder');
  });
  it('show itemview in region', function () {
    articleList = [
    {
      name: 'Corona'
      description: '4.9%'
      price: 2.05
      stars: 4.9
      quantity: 0
      image: 'http://vignette4.wikia.nocookie.net/beer/images/6/6b/Corona.jpg/revision/latest?cb=20130322234121'
    },
    {
      name: 'Victoria'
      description: '4.9%'
      price: 2.05
      stars: 4.5
      quantity: 0
      image: 'http://www.tragos-tragos.com/wp-content/uploads/2012/09/cerveza-victoria.jpg'
    }
    ];
    collection = new Backbone.Collection(articleList);
    articleList = new Marionette.ArticleList();
    layout.getRegion('region1').show();
  });
});
