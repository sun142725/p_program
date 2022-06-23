// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('event', event)
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: wxContext.OPENID, // 通过 getWXContext 获取 OPENID
      weapp_template_msg: {
        page: 'pages/tool/cov-timer/cov-timer',
        data: {
          keyword1: {
            value: '339208499'
          },
          keyword2: {
            value: '2015年01月05日 12:30'
          },
          keyword3: {
            value: '腾讯微信总部'
          }
        },
        templateId: event.templateId,
        formId: event.openid,
        emphasisKeyword: 'keyword1.DATA'
      }
    })
    // result 结构
    // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      ...result
    }
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