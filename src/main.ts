import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';
Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icons', Icons);

new Vue({
  router,
  components: {Nav},
  store,
  render: h => h(App)
}).$mount('#app');
if(document.documentElement.clientWidth>500){
  alert('请使用手机体验效果更佳')
}