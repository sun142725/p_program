import {
  covRecord
} from './db.js'
import db from './db'
const $ = db.command.aggregate
//  获取列表
export async function queryCovEndTime() {
  const wxContext = await wx.cloud.callFunction({
    name: 'get_openid'
  })
  console.log('wxContext', wxContext)
  const result = await covRecord.where({
    openid: wxContext.result.openid
  }).orderBy('createTime', 'desc').limit(1).get()
  if (result.data.length > 0) {
    const covItem = result.data[0]
    const curTime = new Date().getTime()
    if (covItem.expireTime > curTime) {
      const remainTime = Math.floor(covItem.expireTime - curTime) || 0
      return {
        remainTime: remainTime,
        data: {
          ...covItem,
        },
        errCode: 0,
        errMsg: ''
      }
    } else {
      return {
        remainTime: null,
        errMsg: '已过期'
      }
    }
    console.log()
  } else {
    return {
      remainTime: null,
      errMsg: '未查询到记录'
    }
  }


}
// 记录核酸
export async function insert(data) {
  const wxContext = await wx.cloud.callFunction({
    name: 'get_openid'
  })
  const time = data.recordTime.replace(/-/g, "/")
  const expireTime = new Date(time + ":00").getTime() + data.taskTime * 60 * 60 * 1000
  return covRecord.add({
    data: {
      openid: wxContext.result.openid,
      createTime: db.serverDate(),
      taskTime: data.taskTime,
      recordTime: data.recordTime,
      expireTime: expireTime,
      isOpenRemind: data.isOpenRemind
    }
  })
}