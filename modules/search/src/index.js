/* globals Marionette */
'use strict';


Marionette.Search = Marionette.LayoutView.extend({
  template: require('./template.hbs'),
  className: 'mdl-layout__header-row',
  regions:{
    
    search: '#search'

  },
  events:{
    'keyup .search-input': 'searchResults'
  },
  ui: {
   title: '.title-search'
  },
  initialize(options) {
    this.collection = options.collection;
    self =this;
   this.channel = Backbone.Radio.channel('header');
   this.channel.on('title', (title) => {
     self.ui.title.html(title);
   });
   
   _.bindAll(this, 'findValInput');
   this.listenTo(this.collection, 'searched', this.changeFlag);
   this.debounceFunction = _.throttle(this.findValInput, 500)
   this.flagAct = false; 

  },
  searchResults(evt){
    this.findValInput(evt);
  },
  findValInput(evt){
    const value = this.$el.find('input').val();
    if(this.flagAct == false){
      this.flagAct = true
      this.collection.trigger('search', value);
    }
  },
  changeFlag(){
    this.flagAct = false;
  }
});
