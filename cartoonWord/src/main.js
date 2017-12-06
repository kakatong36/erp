// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './iview'
import VueResource from 'vue-resource'
import './site'
import _ from 'lodash'//lodash的全局变量
//jquery已经在webpack.base.conf.js配置成全局变量

Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
