import Vue from 'vue'
import page from 'page'
import routes from './routes'
import moment from 'moment'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})


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