const layoutTemplate = `
<style>
.demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type  {
  padding-right: 0;
}
#toast {
  position:absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}
#toast.active {
  z-index: 100;
}
.show-total span {
  font-size: 70px;
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
  url: 'http://modelo.mobi:1337/articles'
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
  user: new Backbone.Model({ name: 'Barney', lastName: 'Gumble', image: 'http://assets.fxnetworks.com/shows/the-simpsons/photos/swsb_character_fact_barney_550x960.png' })
}));
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
      this._showTotal = _.debounce(this._showTotal, 500);
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
      setTimeout(function(){
        $('#toast').removeClass('active');
      }, 1600);
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

userChannel.on('joined', () => {
  alert(JSON.stringify(pushcrew));
});

(function(p,u,s,h){
    p._pcq=p._pcq||[];
    p._pcq.push(['_currentTime',Date.now()]);
    p._pcq.push(['APIReady', () => {
      userChannel.trigger('joined');
    }, (values) => {
      alert(JSON.stringify(values));
    }]);
    s=u.createElement('script');
    s.type='text/javascript';
    s.async=true;
    s.src='https://cdn.pushcrew.com/js/7a8474c7728d7f23e99c77939824f57e.js';
    h=u.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s,h);
})(window,document);
