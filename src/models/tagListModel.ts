const localStorageKeyName = 'tageList';
type TagListModel = {
  data: string[]
  fetch: () => string[]
  create: (name: string) => 'success' | 'fail'//联合类型
  save: () => void

}
const tagListModel: TagListModel = {
  data: [],
  create(name: string) {
    if (this.data.indexOf(name) >= 0) {
      return 'fail';
    } else {
      this.data.push(name);
      this.save();
      return 'success';
    }
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;