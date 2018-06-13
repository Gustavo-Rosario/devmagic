import Vue from 'vue'
import page from 'page'
import routes from './routes'

window.routes = routes

const app = new Vue({
  el: '#app',
  build: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'assets'
  },
  data: {
    ViewComponent: { render: h => h('div', 'loading...') }
  },
  render (h) { return h(this.ViewComponent) }
})

Object.keys(routes).forEach(route => {
  const Component = require('./pages/' + window.routes[route] + '.vue').default
  page(route,(ctx) => {
    // TEMP
    localStorage.setItem('params', JSON.stringify(ctx.params))
    app.ViewComponent = Component
    
  })
})
page('*', () => app.ViewComponent = require('./pages/404.vue'))
page()