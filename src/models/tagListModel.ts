import createId from '@/lib/createId';

const localStorageKeyName = 'tageList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'fail'//联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'fail'
  remove: (id: string) => 'success' | 'not found'
  save: () => void

}
const tagListModel: TagListModel = {
  data: [],
  create(name: string) {

    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'fail';
    }

      const id = createId().toString();
      this.data.push({id,name: name});
      this.save();
      return 'success';

  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  update(id: string, name: string) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'fail';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id: string) {
    let index=-1
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
      }
    }
    if (index !==-1) {
      this.data.splice(index, 1);
      this.save();
      return 'success';
    } else {
      return 'not found';
    }
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;