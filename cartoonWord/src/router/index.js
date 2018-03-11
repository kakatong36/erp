import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(['@/layout'], resolve),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/home'], resolve)
        },
        {
          path: '/commonList',
          name: 'commonList',
          component: resolve => require(['@/components/form/list'], resolve)
        },
        {
          path: '/printStoneOut',
          name: 'printStoneOut',
          component: resolve => require(['@/components/cssTotal/list'], resolve)
        },
        {
          path: '/detailField',
          name: 'detailField',
          component: resolve => require(['@/components/suit/list'], resolve)
        }
      ]
    },
    {
      path: '/printFace',
      name: 'printFace',
      component: resolve => require(['@/components/print/list'], resolve)
	}
	// ,
    // {
    //   path: '/printFace',
    //   name: 'printFace',
    //   component: resolve => require(['@/components/print/list'], resolve)
    // }
  ]
})
