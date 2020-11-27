type RecordItem = {
  tags: Tag[];
  type: string;
  notes: string;
  amount: number;
  creatAt?:string;
}
type Tag = {
  id: string;
  name: string;
}
interface Window{
}