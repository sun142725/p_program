// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const covRecord = db.collection('covRecord');
const _ = db.command

const getSendList = async (params) => {
  const result = await covRecord.where({
    isOpenRemind: true,
    sendState: 0,
    expireTime: _.lt(new Date().getTime() + (24 * 60 * 60 * 1000))
  }).get()
  return result
}
const updateSendList = async (params) => {
  const result = await covRecord.where({
    isOpenRemind: true,
    sendState: 0
  }).get()
  return result
}
const sendMsg = async () => {

}
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('event', event)
  try {
    const result = await getSendList()
    console.log(result)
    if (result.data && result.data.length > 0) {
      const date = new Date(result.data[0].expireTime)
      cloud.callFunction({
        name: 'send_template_msg',
        data: {
          page: 'pages/tool/cov-timer/cov-timer',
          data: {
            thing1: {
              value: "核酸过期提醒"
            },
            time4: {
              value: date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes()
            },
            thing5: {
              value: "已完成"
            }
          }
        }
      })
    }
    // result 结构
    // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
    return
  } catch (err) {
    // 错误处理
    // err.errCode !== 0
    throw err
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}