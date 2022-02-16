import {
  imageToWordCollection
} from './db.js'
//  获取列表
export function getRecord() {
  return imageToWordCollection.where().get()
}
// 根据_id查询明细
export function getRecordById() {
  return imageToWordCollection.where().get()
}

/**
 * 
 * @param { String } keys 需要取的字段key拼成的字符串，','分割
 * @param { Object } data 数据源 
 */
function getUseData(keys, data) {
  const d = Object.create(null)
  keys.split(',').forEach((v) => {
    if (data[v]) d[v] = data[v]
  })
  return d
}
// 根据_id修改
export function updateRecordById(data) {
  const updateData = getUseData('key')
  return new Promise(() => {
    imageToWordCollection.where({
      _id: data.id
    }).update({
      data: {
        ...updateData
      }
    })
  })
  return
}
// 插入转换记录
export function insert(data) {
  return imageToWordCollection.add({
    data: {
      fileID: data.fileID,
      words: data.words,
      createTime: new Date().getTime()
    }
  })
}