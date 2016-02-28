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
</style>

<div class="demo-layout-waterfall mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header" id="header">
  </header>
  <div class="mdl-layout__drawer" id="drawer">
  </div>
  <main class="mdl-layout__content">
    <div class="page-content" id="content"></div>
  </main>
  <div id="toast"> </div>
</div>`;

const Articles = Backbone.Collection.extend({
  url: 'http://model.mobi:1337/articles'
});

const LayoutView = Marionette.LayoutView.extend({
  el: 'main',
  template: _.template(layoutTemplate),
  regions: {
    header: '#header',
    drawer: '#drawer',
    content: '#content',
    toast: '#toast'
  },
  onRender() {
    this.getRegion('content').show(new Marionette.Form({
      text: 'Eres mayor de edad?',
      buttons: [
        {
          label: 'SI',
          onClick: function() {
            $('.mdl-layout__drawer-button').css({ display: 'initial' });
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
  urlRoot: 'http://model.mobi:1337/users',
  idAttribute: '_id',
});

const user = new User({ _id: '56d28dabb23bf0423c8e12a9' });
user.fetch().then(() => {
  layout.getRegion('drawer').show(new Marionette.Modelo.DrawerView({
    menu: [{
      label: '<i class="fa fa-cart-arrow-down"></i>&nbsp; Pedir ahora',
      href: '/order'
    }, {
      label: '<i class="fa fa-history"></i>&nbsp; Historial de pedidos',
      href: '/orders'
    }, {
      label: '<i class="fa fa-user"></i>&nbsp; Mi Perfil',
      href: '/profile'
    }, {
      label: '<i class="fa fa-music"></i>&nbsp; Eventos',
      href: '/events'
    }],
    user: user
  }));
});
//layout.getRegion('header').show(new Marionette.form());

const articles = new Articles();
const Router = Marionette.AppRouter.extend({
  appRoutes: {
    'order': 'order',
    'orders': 'orders',
    'events': 'events',
    'profile': 'profile'
  },
  controller: {
    order() {
      var self = this;
      this._showTotal = _.debounce(this._showTotal.bind(this), 500);
      this._closeTotal = _.debounce(this._closeTotal, 1600);
      articles.fetch().done(function(){
        articles.listenTo(articles, 'change', self._showTotal);
      });
      layout.getRegion('content').show(new Marionette.ArticleList({ collection: articles }))
    },
    orders() {

    },
    events() {

    },
    profile() {

    },
    _showTotal: function() {
      var total = 0;
      articles.each(function(article){
        total+= parseFloat(article.get('currentPrice'));
      });
      total = total.toFixed(2);
      var showTotal = new Marionette.ShowTotal({
        total: total
      });
      layout.getRegion('toast').show(showTotal);
      $('#toast').addClass('active');
      this._closeTotal();
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

if (document.location.pathname != '/') {
  document.location.href = '/';
}

new Router();

Backbone.Intercept.start();
Backbone.history.start({
  pushState: true
});

const userChannel = Backbone.Radio.channel('user');

navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude.toFixed(3);
    var longitude = position.coords.longitude.toFixed(3);
    user.set('location', [longitude, latitude]);
    user.save();
});

