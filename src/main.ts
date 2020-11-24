import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false
Vue.component('Nav', Nav)
Vue.component('Layout',Layout)
Vue.component('Icons',Icons)
window.tagList = tagListModel.fetch();
window.createTag = (name:string) =>{
  const massage = tagListModel.create(name);
  if(massage==='fail'){
    window.alert('你已经有一个标签了！')
  }
  else if(massage === 'success') {
    window.alert('创建成功！');
  }
  return
}
new Vue({
  router,
  components: {Nav},
  store,
  render: h => h(App)
}).$mount('#app')
