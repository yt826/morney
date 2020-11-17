const localStorageKeyName = 'tageList';
type Tag ={
  id:string;
  name:string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'fail'//联合类型
  save: () => void

}
const tagListModel: TagListModel = {
  data: [],
  create(name: string) {
    const names = this.data.map(item=>item.name)
    if (names.indexOf(name) >= 0) {
      return 'fail';
    } else {
      this.data.push({id:name,name:name});
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