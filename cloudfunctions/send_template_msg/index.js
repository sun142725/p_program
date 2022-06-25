// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('event', event, wxContext)
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID, // 通过 getWXContext 获取 OPENID
      templateId: event.templateId,
      page: event.page || undefined,
      miniprogramState: 'trial', // developer为开发版；trial为体验版；formal为正式版；默认为正式版
      data: event.data
    })
    // result 结构
    // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
    return result
  } catch (err) {
    // 错误处理
    // err.errCode !== 0
    const log = cloud.logger()
    log.error({
      name: 'send_template_msg',
      err: err
    })
    throw err
  }
}