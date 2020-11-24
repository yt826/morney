import clone from '@/lib/clone';
const localStorageKeyName = 'recordList';

 const recordStore={
   recordList:[] as RecordItem[],
  fetchRecords(){
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList
  },
  createRecordList(record: RecordItem) {
    const record2:RecordItem = clone(record)
    record2.creatAt = new Date();
    this.recordList.push(record2);
    this.saveRecords()
  },
   saveRecords(){
     window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
   }
}
recordStore.fetchRecords()
export default recordStore;