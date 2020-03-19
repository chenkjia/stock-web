import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/stocks'
    },
    {
      path: '/stocks',
      component: () => import(/* webpackChunkName: "appFrame" */ '@/views/Stocks')
    }
  ]
})

export default router
