import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(['@/layout'], resolve),
      redirect: '/commonList',
      children: [
        {
          path: '/commonList',
          name: 'commonList',
          component: resolve => require(['@/components/form/list'], resolve)
        }
      ]
    }
  ]
})
