export default {
  data: {
    rtcInfo: {},
    isLogin: false,
    isSDKReady: false, // TIM SDK 是否 ready
    messages: [
      {
        content: {
          subType: 'system', // 二级类型
          isDiagnosis: false, // 是否是诊断记录
          title: '住院信息', //  isUserInfo为false 时使用
          subTitle: '',  // isUserInfo为true 时使用
          template: 'label',
          contentText: '',
          contentImages: [],
          contentLabel: {
            '开药医院': '上海是交通大学医学院附属新华医院',
            '开药时间': '2017.03.12',
            '处方': '头孢丙烯分散片  x2\n头孢丙烯分散片头孢丙烯分散片  x1',
            '出院遗嘱': '病人出院后，需要注意饮食，清淡为主 不宜过量饮酒及剧烈运动，建议出院后3个月岛医院复查。'
          },
          hasFooter: true,
        },
        type: 'custom',
        id: '1',
        isSend: true,
        time: '1569568477'
      },
      {
        content: {
          subType: 'system', // 二级类型
          isDiagnosis: false, // 是否是诊断记录
          templates: ['text'],
          title: '系统提示', //  isUserInfo为false 时使用
          subTitle: '',  // isUserInfo为true 时使用
          template: 'text',
          contentText: '抱歉，由于您提交的病情不对症，医生已为您退诊，请选择对症的医生重新提交。服务相关费用将会在3个工作日内返回您的付款账户',
          contentImages: [],
          hasFooter: true,
        },
        type: 'custom',
        id: '1',
        isSend: true,
        time: '1569568477'
      },
      {
        content: {
          subType: 'prescription', // 二级类型
          isDiagnosis: true, // 是否是诊断记录
          title: '赵日天', //  isUserInfo为false 时使用
          subTitle: '男 | 34岁',  // isUserInfo为true 时使用
          template: 'textImage',
          contentText: '最好是几粒就见效的那种，因为我还有好多原型没画，一忙起来就想不起吃药。谢谢了！',
          contentImages: ['https://uat-gateway.dr-elephant.net/sysfile-oss/sysFile/downloadFile?url=https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/UX/13698078888/20190124/2f1da089c6b5421e905a594f8fa1c637.png', 'https://uat-gateway.dr-elephant.net/sysfile-oss/sysFile/downloadFile?url=https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/UX/13698078888/20190124/2f1da089c6b5421e905a594f8fa1c637.png', 'https://uat-gateway.dr-elephant.net/sysfile-oss/sysFile/downloadFile?url=https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/UX/13698078888/20190124/2f1da089c6b5421e905a594f8fa1c637.png'],
          hasFooter: false,
        },
        type: 'system',
        id: '1',
        isSend: true,
        time: '1569568477'
      },
      {
        content: '病情分析：你好，目前的情况应该不是肺热，肺热的表现应该是痰多，咳嗽，而不是这种症状。建议你去看看中医大夫，调理一下。指导意见：你好，目前的情况应该不是肺热，肺热的表现应该是痰多，咳嗽，而不是这种症状。建议你去看看中医大夫，调理一下，也许就没事了',
        type: 'text',
        id: '1',
        isSend: true,
      },
      {
        content: '尤其是在午睡之后，早上起来有时候也会这样，想知道是肺热还是什么，平时喝一些菊花茶或者什么茶会不会有改善？还有平时睡觉睡着就全身发热，不知道是不是正常现象',
        type: 'text',
        id: '1',
        isSend: false,
        time: '1569568477'
      },
      {
        content: '尤其是在午睡之后，早上起来有时候也会这样，想知道是肺热还是什么，平时喝一些菊花茶或者什么茶会不会有改善？还有平时睡觉睡着就全身发热，不知道是不是正常现象',
        type: 'text',
        id: '1',
        isSend: false,
        time: '1569568477'
      },
      {
        content: 'https://uat-gateway.dr-elephant.net/sysfile-oss/sysFile/downloadFile?url=https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/UX/13698078888/20190124/2f1da089c6b5421e905a594f8fa1c637.png',
        type: 'image',
        id: '1',
        isSend: true,
        time: '1569568477'
      },
    ], //  聊天记录
    currentConversation: {},
    conversationList: []
  },
}