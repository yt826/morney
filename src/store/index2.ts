import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  recordList: recordListModel.fetch(),
  createRecordList: (record: RecordItem) => {
    recordListModel.create(record);
  },
  tagList: tagListModel.fetch(),
  findTag: function (id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    const massage = tagListModel.create(name);
    if (massage === 'fail') {
      window.alert('你已经有一个标签了！');
    } else if (massage === 'success') {
      window.alert('创建成功！');
    }
    return;
  },
  removeTag: (id: string) => {
    const massage = tagListModel.remove(id);
    return massage === 'success';
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
};
export default store;