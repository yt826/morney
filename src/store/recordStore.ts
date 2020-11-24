import recordListModel from '@/models/recordListModel';

export default {
  recordList: recordListModel.fetch(),
  createRecordList: (record: RecordItem) => {
    recordListModel.create(record);
  },
}