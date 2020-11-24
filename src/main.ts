import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false
Vue.component('Nav', Nav)
Vue.component('Layout',Layout)
Vue.component('Icons',Icons)
//record store
window.recordList = recordListModel.fetch();
window.createRecordList = (record:RecordItem)=>{
  recordListModel.create(record)
}
//tag store
window.tagList = tagListModel.fetch();
window.findTag = (id:string)=>{
  return window.tagList.filter(t => t.id === id)[0];
};
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
window.removeTag = (id:string) =>{
  const massage = tagListModel.remove(id);
  return massage === 'success';
}
window.updateTag = (id:string,name:string) =>{
   return tagListModel.update(id, name);
}

new Vue({
  router,
  components: {Nav},
  store,
  render: h => h(App)
}).$mount('#app')
