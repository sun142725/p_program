import { imageToWordCollection } from './db.js'
//  获取列表
export function getRecord() {
  return imageToWordCollection.where().get()
}
// 根据_id查询明细
export function getRecordById() {
  return imageToWordCollection.where().get()
}
// 插入转换记录
export function insert(data){
  return imageToWordCollection.add({
    data: {
      fileID: data.fileID,
      words: data.words,
      createTime: new Date().getTime()
    }
  })
}