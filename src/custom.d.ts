type RecordItem = {
  tags: string[];
  type: string;
  notes: string;
  amount: number;
  creatAt?:string;
}
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
interface Window{
}