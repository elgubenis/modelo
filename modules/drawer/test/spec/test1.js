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
    layout.getRegion('region1').show(new Marionette.G4.Popover());
  });
});
