import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import request from '@/utils/request';

import Element from 'element-ui'
import './styles/element-variables.scss'
Vue.use(Element, {
  size: 'medium',
});

// import BtDesign from '@/index';
// @ts-ignore
import BtDesign from 'bt-design';
console.log('BtDesign:', BtDesign);
Vue.use(BtDesign, {
  preview: true,
  editor: true,
  BTCLASS_URL: 'https://test.btclass.net',
  request,
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
