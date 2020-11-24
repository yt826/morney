import createId from '@/lib/createId';
const localStorageKeyName = 'tageList';

const tagStore = {
 tagList: [] as Tag[],
  fetchTag() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  findTag: function (id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag (name: string) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      alert('重复了！')
      return 'fail';

    }
    const id = createId().toString();
    this.tagList.push({id,name: name});
    this.saveTags();
    alert('添加成功！')
    return 'success'
  },
  removeTag(id: string) {
   let index=-1
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
      }
    }
    if (index !==-1) {
      this.tagList.splice(index, 1);
      this.saveTags();
      return 'success';
    } else {
      return 'not found';
    }
  },
  updateTag (id: string, name: string){
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'fail';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
}
tagStore.fetchTag();
export default tagStore;