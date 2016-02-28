const layoutTemplate = `
<style>
.demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type  {
  padding-right: 0;
}
</style>

<div class="demo-layout-waterfall mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header" id="header">
    <!-- <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Pedido</span>
    </div> -->
  </header>
  <div class="mdl-layout__drawer" id="drawer">
    <!-- <span class="mdl-layout-title">ModeloNow</span>
    <nav class="mdl-navigation">
      <a class="mdl-navigation__link" href="">A</a>
      <a class="mdl-navigation__link" href="">B</a>
      <a class="mdl-navigation__link" href="">C</a>
      <a class="mdl-navigation__link" href="">D</a>
    </nav> -->
  </div>
  <main class="mdl-layout__content">
    <div class="page-content" id="content"></div>
  </main>
</div>`;

const Articles = Backbone.Collection.extend({
  url: 'http://localhost:1337/articles'
});

const LayoutView = Marionette.LayoutView.extend({
  el: 'main',
  template: _.template(layoutTemplate),
  regions: {
    header: '#header',
    drawer: '#drawer',
    content: '#content'
  },
  onRender() {
    this.getRegion('content').show(new Marionette.Form({
      text: 'Eres mayor de edad?',
      buttons: [
        {
          label: 'SI',
          onClick: function() {
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
    label: 'Pedir ahora',
    href: '/order'
  }, {
    label: 'Historial de pedidos',
    href: '/orders'
  }, {
    label: 'Mi Perfil',
    href: '/profile'
  }, {
    label: 'Eventos',
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
      articles.fetch();
      layout.getRegion('content').show(new Marionette.ArticleList({ collection: articles }))
    },
    orders() {

    },
    events() {

    },
    profile() {

    },
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

(function(p,u,s,h){
    p._pcq=p._pcq||[];
    p._pcq.push(['_currentTime',Date.now()]);
    s=u.createElement('script');
    s.type='text/javascript';
    s.async=true;
    s.src='https://cdn.pushcrew.com/js/7a8474c7728d7f23e99c77939824f57e.js';
    h=u.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s,h);
})(window,document);
