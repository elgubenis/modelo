'use strict';

if (document.location.pathname != '/' && document.location.pathname.indexOf('code') === -1) {
  document.location.href = '/';
}

const layoutTemplate = `
<style>
.demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type  {
  padding-right: 0;
}
#toast {
  position:absolute;
  top: 40%;
  left: 25px;
  width: calc(100% - 100px);
  height: 80px;
}
#toast.active {
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.7);
}
#toast.active span{
  opacity: 1!important;
}
.show-total span {
  font-size: 50px;
}

#footer {
  max-height: 200px;
  background-color:rgba(255, 255, 255, 1);
}
</style>

<div class="demo-layout-waterfall mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header" id="header">
  </header>
  <div class="mdl-layout__drawer" id="drawer">
  </div>
  <main class="mdl-layout__content">
    <div class="page-content" id="content"></div>
  </main>
  <footer id="footer"></footer>
  <div id="toast"></div>
  <div id="cart"></div>
  <div id="time"></div>
</div>`;

const Articles = Backbone.Collection.extend({
  url: 'http://www.modelo.mobi:1337/articles',
  initialize() {
    this.listenTo(this, 'search', (query) => {
      this.byQuery(query);
    });
  },
  byQuery(query) {
    if (query) {
      query = query.toLowerCase();
    }
    if (!this.original) {
      this.original = new Articles(this.models);
    }
    const filtered = this.original.filter((item) => {
      let name = item.get('name');
      if (name) {
        name = name.toLowerCase();
      }
      return name.indexOf(query) > -1
    });
    this.reset(filtered);
    this.trigger('searched');
  }
});

const LayoutView = Marionette.LayoutView.extend({
  el: 'main',
  template: _.template(layoutTemplate),
  regions: {
    header: '#header',
    drawer: '#drawer',
    content: '#content',
    footer: '#footer',
    toast: '#toast',
    cart: '#cart',
    time: '#time'
  },
  onRender() {
    this.getRegion('content').show(new Marionette.Form({
      text: 'Eres mayor de edad?',
      buttons: [
        {
          label: 'SI',
          onClick: function() {
            $('.mdl-layout__drawer-button').css({ display: 'block' });
            Backbone.history.navigate('/order', true);
          }
        },
        {
          label: 'NO',
          onClick: function() {
            document.location.href = 'http://www.google.com';
          }
        }
      ]
    }));
  }
});

const layout = new LayoutView();

layout.render();

const User = Backbone.Model.extend({
  urlRoot: 'http://www.modelo.mobi:1337/users',
  idAttribute: '_id',
});

const user = new User({ _id: '56d28dabb23bf0423c8e12a9' });
user.fetch().then(() => {
  layout.getRegion('drawer').show(new Marionette.Modelo.DrawerView({
    menu: [{
      label: '<i class="fa fa-cart-arrow-down"></i>&nbsp; Pedir Ahora!',
      href: '/order'
    }, {
      label: '<i class="fa fa-history"></i>&nbsp; Historial de Pedidos',
      href: '/orders'
    }, {
      label: '<i class="fa fa-user"></i>&nbsp; Mi Perfil',
      href: '/profile'
    }, {
      label: '<i class="fa fa-beer"></i>&nbsp; Logros',
      href: '/achievments'
    }, {
      label: '<i class="fa fa-music"></i>&nbsp; Eventos',
      href: '/events'
    }],
    user: user
  }));
});
//layout.getRegion('header').show(new Marionette.form());
var articles = new Articles();
const searchView = new Marionette.Search({ collection: articles });
layout.getRegion('header').show(searchView);
componentHandler.upgradeDom();

const Order = Backbone.Model.extend({
  urlRoot: 'http://www.modelo.mobi:1337/orders',
  idAttribute: '_id'
});

const Awards = Backbone.Collection.extend({
  url: function(){
    return 'http://www.modelo.mobi:1337/users/'+user.get('_id')+'/awards';
  }
});

const Events = Backbone.Collection.extend({
  url: function(){
    return 'http://www.modelo.mobi:1337/users/'+user.get('_id')+'/events';
  }
});

const Promotion = Backbone.Model.extend({
  urlRoot: 'http://www.modelo.mobi:1337/discounts/',
  idAttribute: 'shortid'
});

const Router = Marionette.AppRouter.extend({
  appRoutes: {
    'order': 'order',
    'orders': 'orders',
    'events': 'events',
    'profile': 'profile',
    'ticket': 'ticket',
    'confirmation': 'confirmation',
    'achievments': 'achievments',
    'code/:_id': 'code'
  },
  controller: {
    code(_id) {
      $('.mdl-layout__drawer-button').css({ display: 'block' });
      const promotion = new Promotion({ shortid: _id });
      promotion.fetch().then(() => {
        if (promotion.get('discount')) {
          articles.discount = promotion.get('discount');
          articles.start = new Date().getTime()/1000;
          articles.duration = 20;
          articles.end = articles.start+(articles.duration*1);
          setTimeout(() => {
            delete articles.discount;
            delete articles.start;
            delete articles.end;
            articles.trigger('timeout');
          }, (articles.end-articles.start)*1000);
        }
        Backbone.history.navigate('/order');
        this.order();
      });
    },
    order() {
      layout.getRegion('footer').empty();
      var self = this;
      if (articles.discount) {
        layout.getRegion('time').show(new Marionette.Countdown({ duration: articles.duration }));
      }
      this.articles = articles;
      this.articles.stopListening(this.articles, 'change', this._showTotalDebounce);
      this._showTotalDebounce = _.debounce(this._showTotal.bind(this), 500);
      this._closeTotalDebounce = _.debounce(this._closeTotal, 1600);
      articles.fetch().done(function(){
        articles.listenTo(articles, 'change', self._showTotalDebounce);
      });

      layout.getRegion('content').show(new Marionette.ArticleList({
        collection: articles
      }))
      var buttonView = new Marionette.Modelo.Button({
        addOrder() {
          Backbone.history.navigate('/ticket', true);
        },
        addSchedule() {
          console.log('):');
        },
      });
      layout.getRegion('cart').show(buttonView);
    },
    orders() {
      const Orders = Backbone.Collection.extend({
        comparator: 'created_at',
        url: `http://www.modelo.mobi:1337/users/${user.get('_id')}/orders`
      });
      const collection = new Orders();
      collection.fetch();
      layout.getRegion('content').show(new Marionette.HistoryList({ collection }));
    },
    events() {
      layout.getRegion('cart').empty();
      layout.getRegion('footer').empty();
      layout.getRegion('toast').empty();
      var eventsList = new Events();
      eventsList.fetch()
      var events = new Marionette.EventsList({
        collection: eventsList
      })
      layout.getRegion('content').show(events)
    },
    profile() {

    },
    achievments() {
      layout.getRegion('cart').empty();
      var awardsList = new Awards();
      awardsList.fetch();
      var awards = new Marionette.Awards({
        collection: awardsList
      });
      var mililiters = new Marionette.Modelo.Mililiters({ full: true, success: 'Boletos de F1', fail: 'Sigue acumulando puntos' });
      layout.getRegion('content').show(mililiters);
      layout.getRegion('footer').show(awards);
    },
    confirmation() {
      var confirmationView = new Marionette.Modelo.ConfirmationView({});
      layout.getRegion('footer').empty();
      layout.getRegion('content').show(confirmationView);
      if (this.lastOrderNo) {
        let txt = $('.mdl-card__title-text').text();
        txt += ` # de Pedido: ${this.lastOrderNo}`;
        this.lastOrderNo = undefined;
        $('.mdl-card__title-text').text(txt);
      }
    },
    ticket() {
      var self = this;
      this.articles.stopListening(this.articles, 'change', this._showTotalDebounce);
      layout.getRegion('cart').empty();
      layout.getRegion('cart').empty();
      var ticketView = new Marionette.Ticket({
        collection: this.articles
      });
      layout.getRegion('content').show(ticketView);
      var directionView = new Marionette.DirectionView({
        model: new Backbone.Model(),
        onClick() {
          const opts = {
            articles: self.articles.toJSON(),
            userId: user.get('_id'),
            direction: this.model.get('direction')
          };
          if (this.model.collection && this.model.collection.discount) {
            opts.discount = this.model.collection.discount;
          }
          var order = new Order(opts);
          order.save().done(() => {
            layout.getRegion('time').empty();
            self.lastOrderNo = order.get('order_no');
            Backbone.history.navigate('/confirmation', true);
          })
        }
      });
      layout.getRegion('footer').show(directionView);
    },
    _showTotal: function() {
      console.log('show total');
      var total = 0;
      this.articles.each(function(article){
        total+= parseFloat(article.get('currentPrice'));
      });
      total = total.toFixed(2);
      var showTotal = new Marionette.ShowTotal({
        total: total
      });
      layout.getRegion('toast').show(showTotal);
      $('#toast').addClass('active');
      this._closeTotalDebounce();
    },
    _closeTotal: function() {
      console.log('close total')
      $('#toast').removeClass('active');
    }
  },
  onRoute: function () {
    if (document.body.querySelector('.mdl-layout__obfuscator.is-visible')) {
      document.body.querySelector('.mdl-layout__obfuscator.is-visible').click();
    }
  }
});

new Router();

Backbone.Intercept.start();
Backbone.history.start({
  pushState: true
});

const userChannel = Backbone.Radio.channel('user');

const saveCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude.toFixed(3);
      var longitude = position.coords.longitude.toFixed(3);
      user.set('location', [longitude, latitude]);
      user.save();
  });
};

setTimeout(saveCurrentPosition, 1000*60*30);
saveCurrentPosition();

