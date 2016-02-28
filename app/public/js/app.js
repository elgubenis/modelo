'use strict';

if (document.location.pathname != '/') {
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
  background-color:rgba(255, 255, 255, 0.7);
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
    cart: '#cart'
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
  urlRoot: 'http://localhost:1337/orders',
  idAttribute: '_id'
});

const Awards = Backbone.Collection.extend({
  url: function(){
    return 'http://localhost:1337/users/'+user.get('_id')+'/awards';
  }
});
const Router = Marionette.AppRouter.extend({
  appRoutes: {
    'order': 'order',
    'orders': 'orders',
    'events': 'events',
    'profile': 'profile',
    'ticket': 'ticket',
    'confirmation': 'confirmation',
    'achievments': 'achievments'
  },
  controller: {
    order() {
      layout.getRegion('footer').empty();
      var self = this;
      this.articles = articles;
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

    },
    events() {

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
      layout.getRegion('content').empty();
      layout.getRegion('footer').show(awards);
    },
    confirmation() {
      var confirmationView = new Marionette.Modelo.ConfirmationView({});
      layout.getRegion('footer').empty();
      layout.getRegion('content').show(confirmationView);
    },
    ticket() {
      var self = this;
      layout.getRegion('cart').empty();
      layout.getRegion('content').empty();
      layout.getRegion('cart').empty();
      var directionView = new Marionette.DirectionView({
        model: new Backbone.Model(),
        onClick() {
          var order = new Order({
            articles: self.articles.toJSON(),
            userId: user.get('_id'),
            direction: this.model.get('direction')
          });
          order.save().done(function(){
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

