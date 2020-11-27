import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';
const localStorageKeyNameRecord = 'recordList';
const localStorageKeyNameTag = 'tageList';

Vue.use(Vuex)
type rootState = {
  currentTag?:Tag,
  recordList: RecordItem[],
  tagList: Tag[]
}
const store = new Vuex.Store({
  state: {
    currentTag:undefined,
    recordList:[] as RecordItem[],
    tagList: [] as Tag[],
  } as rootState,
  mutations: {
    fetchRecords(state){
          state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyNameRecord) || '[]') as RecordItem[];
          return state.recordList
        },
        createRecordList(state,record: RecordItem) {
      if(!state.tagList||state.tagList.length === 0){
        store.commit('createTag','衣')
        store.commit('createTag','食')
        store.commit('createTag','住')
        store.commit('createTag','行')
      }
          const record2:RecordItem = clone(record)
          record2.creatAt = new Date().toISOString();
          state.recordList.push(record2);
          store.commit('saveRecords')
        },
      setCurrentTag(state,id:string){
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
      },
        saveRecords(state){
          window.localStorage.setItem(localStorageKeyNameRecord, JSON.stringify(state.recordList));
        },
    fetchTag(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyNameTag) || '[]');
      return this.tagList;
    },
    createTag (state,name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        alert('重复了！')
      }
      const id = createId().toString();
      state.tagList.push({id,name: name});
      store.commit('saveTags')
    },
    removeTag(state,id: string) {
      let index=-1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
        }
      }
      if (index !==-1) {
        state.tagList.splice(index, 1);
        store.commit('saveTags')
        alert('删除成功！')
      }
    },
    updateTag(state,tag:Tag){
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(tag.id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(tag.name) >= 0) {
        } else {
          const tag1 = state.tagList.filter(item => item.id === tag.id)[0];
          tag1.name = tag.name;
          store.commit('saveTags')
        }
      }
    },
    saveTags(state) {
      window.localStorage.setItem(localStorageKeyNameTag, JSON.stringify(state.tagList));
    }
  }
})
store.commit('fetchTag')
store.commit('fetchRecords')
export default store;