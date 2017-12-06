import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(['@/layout'], resolve),
      redirect: '/HelloWorld',
      children: [
        {
          path: '/HelloWorld',
          name: 'HelloWorld',
          component: resolve => require(['@/components/HelloWorld'], resolve)
        }
      ]
    }
  ]
})
