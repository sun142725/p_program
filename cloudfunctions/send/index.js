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
const updateSendList = async (ids) => {
  const result = await covRecord.where({
    _id: _.in(ids),
  }).update({
    data: {
      sendState: 1
    }
  })
  console.log('修改的数据量返回', result)
  // return result
}
const sendMsg = async (item) => {
  let date = new Date(item.expireTime)
  try{
    await cloud.callFunction({
      name: 'send_template_msg',
      data: {
        page: 'pages/tool/cov-timer/cov-timer',
        templateId: "oNLCnRDriuzA-YURfJgBQuxvf2lr8JiJYowyzDBkwGw",
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
  }catch(err){
    const log = cloud.logger()
    console.log('打印失败信息', err)
    log.error({
      name: 'sendMsg_error',
      err: err,
      datainfo: item
    })
  }
  
}
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('event', event)
  try {
    const result = await getSendList()
    console.log(result)
    if (result.data && result.data.length > 0) {
      let ids = []
      for(let i = 0; i < result.data.length; i++){
        ids.push(result.data[i]._id)
        setTimeout(()=>{
          sendMsg(result.data[i])
        }, 1000)
      }
      updateSendList(ids)
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