```html
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
    </header>
    <div id='module' class='mdl-layout__drawer'></div>
  </div>
```

```js
<script>
  const LayoutView = Marionette.LayoutView.extend({
    template: false,
    el: 'body',
    regions: {
      preview: '#module'
    },
    initialize() {
      this.render();
    },
  });
  const drawerView = new Marionette.Modelo.DrawerView({
    menu: [
    { label: 'Usuario', href: '/user' },
    { label: 'Pedidos', href: '/orders' },
    { label: 'Eventos', href: '/events'},
    ],
    user: {
      name: 'Roberto',
      lastName: 'Sosa',
      image: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwICAwQFBAQEBAQFBgUFBQUFBQYGBwcIBwcGCQkKCgkJDAwMDAwMDAwMDAwMDAwMAQMDAwUEBQkGBgkNCwkLDQ8ODg4ODw8MDAwMDA8PDAwMDAwMDwwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABaAFoDAREAAhEBAxEB/8QAgwABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAgEJAQEAAwEAAAAAAAAAAAAAAAAAAQIDBBAAAQQBAwMBBAQPAAAAAAAAAQARAgMEITESQRMFUWGBIhShUrIjcZGxMkKCojNDU3M0NdUGEQEBAAMBAAMBAQAAAAAAAAAAARExAgMhQdFREv/aAAwDAQACEQMRAD8A/bBdbEQEBAQZ/lcnh3Pl7e3x5dzhLjxZ3dtlGYnDApQICAgICAgICDPjY1uVbGmmPKUtz0A6kn0UW4TJlZvHeGONabsrhZKDdgRJIB6kggajoseu86XnKfWazBfjY+VHhfVGwDYncfgI1GymWzSLMqh5PxhwTGyuRnjzPEGTchJtjs7st+O8qWYRKuqICAgICAgufgqY14Qt0Mr5SkSzECJ4gP12f3rD0vy050mVmsICDXy6Bk411Gj2RIi5IHIaxJb0Knm4qLHO11MhAQEBAQEF58P/AI3G/X+3Jc/e2vOkmqJEBAQczXWxEBAQEBAQXTwdfDAjLk/enKbNs3wt+yuf0vy050mFRYQEGK+vvU3U8uPdhKHJnbkGdlMuKOcLqYiAgICAgILd4TMplj14hkI31mXGB/SD8nGjddlh6c3OWnNTyzWEBBqZmZTh1GdshyIPar6yIDtoD+NW55tRbhz5dLIQEBAQEBBkpunRbXdWWnXISG+vsLdD1UWZS6Bi5NeXRC6sj4h8cQX4y6xO2y5rMVpLlsKEiCi+UzRm5JlAk0VjjS7h/Ut7T9DLo45xGduUarqiAgICAgICC5eBhKOCZSDCy2UoH1DCP5QVh6bac6TSzWYMqErMbIrgHnZVOMB6kxIG6mbRXOl1MhAQEBAQEH2MZSkIxBlKRaMRqST0CJTGH4XJvlGV8Tj0v8XLSZGu0em3X6Vn16SJnK4whGuEK4BoVxEYD0ADDdYNHpAQVryXhrLLZ5GI0jYTKykljyJ1MSdNd9Vrz6fVUvKt2VW0yEba5VSIcRmDEt66rWXKrwpQICDNRj3ZNnaorNk2JYaaDqSdAotkTIsWN/z8YmMsq7m29Veg3+sdWb2BZX0/i05TlGJjYw+4pjWWI5APJiXYyOpWd6tWkbChIgICAgx2VVXREba42xBcRmBIP66qZcCGyPA4tjGiUsYjcazid+hLv71eel+1byruX4/JwiO9EGEi0bYl4ks7eo96156lUsw0lZC7+GxhRhQmYtZkfeTOmx/N1HRtVz93Nacz4SqosICAgICAgICDFdTC+qymwPCyJidtPaH6joplwKD8nk/y/wCN8vuP3n1d/p2XR/qMsLzhf2eJ/Rr+yFz9brSabShIgICAgICAgICCs/7la/in6//Z',
    }
  });
  const layout = new LayoutView();
  layout.getRegion('preview').show(drawerView);
</script>
```
