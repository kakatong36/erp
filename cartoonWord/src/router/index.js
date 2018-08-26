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
        },
        {
          path: '/projectManagement',
          name: 'projectManagement',
          component: resolve => require(['@/components/projectManagement/list'], resolve)
        },
        {
          path: '/dictionary',
          name: 'dictionary',
          component: resolve => require(['@/components/dictionary/list'], resolve)
        },
        {
          path: '/supplierClass',
          name: 'supplierClass',
          component: resolve => require(['@/components/supplierClass/list'], resolve)
        },
        {
          path: '/orderSearchDetails',
          name: 'orderSearchDetails',
          component: resolve => require(['@/components/order/edit'], resolve)
        },
        {
          path: '/orderPrint',
          name: 'orderPrint',
          component: resolve => require(['@/components/order/print'], resolve)
        },
        {
          path: '/searchIntervalConfig',
          name: 'searchIntervalConfig',
          component: resolve => require(['@/components/intervalConfig/list'], resolve)
		},
		{
			path: '/menuIndex',
			name: 'menuIndex',
			component: resolve => require(['@/components/menu/index'], resolve)
		},{
			path: '/discountManage/:levelId',
			name: 'discountManage',
			component: resolve => require(['@/components/member/list'], resolve)
		},{
			path: '/regularGoods/:id',
			name: 'regularGoods',
			component: resolve => require(['@/components/regularGoods/list'], resolve)
		},{
			path: '/accountManage',
			name: 'accountManage',
			component: resolve => require(['@/components/usercenter/accountManage'], resolve)
		},{
			path: '/orderView',
			name: 'orderView',
			component: resolve => require(['@/components/order/view'], resolve)
		},{
			path: '/supplierManagement',
			name: 'supplierManagement',
			component: resolve => require(['@/components/suplie/list'], resolve)
		},{
			path: '/warehouse',
			name: 'warehouse',
			component: resolve => require(['@/components/warehouse/list'], resolve)
		},{
			path: '/render',
			name: 'render',
			component: resolve => require(['@/components/render/render'], resolve)
		},{
			path: '/accountManagement',
			name: 'accountManagement',
			component: resolve => require(['@/components/accent/list'], resolve)
		}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/print/list'], resolve)
	}
	// ,
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: resolve => require(['@/components/print/list'], resolve)
    // }
  ]
})
