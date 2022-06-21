import {
  mycardCollection
} from './db.js'
//  获取列表
export function getRecord() {
  return mycardCollection.where().get()
}
// 根据_id查询明细
export function getRecordById() {
  return mycardCollection.where().get()
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
  const updateData = getUseData('key,id', data)
  return new Promise(() => {
    mycardCollection.where({
      _id: data.id
    }).update({
      data: {
        ...updateData
      }
    })
  })
  return
}
// 插入记录
export function insertRecord(data) {
  const updateData = getUseData('friendMobile,friendName,autographPic', data)
  return mycardCollection.add({
    data: {
      ...updateData,
      _createTime: new Date(),
      _updateTime: new Date()
    }
  })
}
// 更新记录
export function updateRecord(data) {
  const updateData = getUseData('friendMobile,friendName,autographPic', data)
  return mycardCollection.where({
    '_id': data.id
  }).update({
    data: {
      ...updateData,
      _updateTime: new Date()
    },

  })
}
// 查询记录列表
export function queryRecord(data) {
  return mycardCollection.where()
}
// 查询记录明细
export function queryRecordById(data) {
  return mycardCollection.where({
    '_id': data.id
  })
}