import TIM from '../../../utils/tim-wx.js'
console.log('TIM', TIM)
const tim = TIM.create({
  SDKAppID: 1400164159
})
wx.$apptim = tim
let promise = tim.login({ userID: '18000000002', userSig: 'eJxNj11Pg0AQRf*K2Wej*wXSvjW1RKAE2lJLn8jKLjB*AIHVVhr-u5RsjPN4Tu7M3AtK1rs7kefNZ60z-d0qNEcY3U4YpKo1FKC6ERIHm6FGi7YFmQmdsU7*S-XyLZvUNcQxJjYn1sxIdW6hU5ko9LSU2fgvBuUIwtVx6W2WwSmJq9PwTHu7CIdenYu0STn3nuLgFRbvLnN1OSS5CHDpVQvvpdzq*6hhzX6V8si1Ye3vpL9X8cajj5JEhzCEqHa2fmWOafi4FiXWw-jdzHaI4V*q66Gp0fwGUUwsQtnUGP38AnwwV0A_' });
promise.then(function (imResponse) {
  console.log(imResponse.data); // 登录成功
}).catch(function (imError) {
  console.warn('login error:', imError); // 登录失败的相关信息
});
import chatStore from '../../../store/chatStore.js'
console.log(wx)
const imOperator = {
  reset: function (){
    Object.assign(chatStore.data, {
      currentUserProfile: {},
      isLogin: false,
      isSDKReady: false, // TIM SDK 是否 ready
      conversationList: [],
      currentConversation: {},
    })
  },
  initListener: initListener,
  timLogin: function (param = {}, callback) {
    console.log('登陆', tim)
    wx.showLoading()
    chatStore.data.isLogin = false
    imOperator.reset()
    tim.login({
        userID: '18000000002',
      userSig: 'eJxNj11Pg0AQRf*K2Wej*wXSvjW1RKAE2lJLn8jKLjB*AIHVVhr-u5RsjPN4Tu7M3AtK1rs7kefNZ60z-d0qNEcY3U4YpKo1FKC6ERIHm6FGi7YFmQmdsU7*S-XyLZvUNcQxJjYn1sxIdW6hU5ko9LSU2fgvBuUIwtVx6W2WwSmJq9PwTHu7CIdenYu0STn3nuLgFRbvLnN1OSS5CHDpVQvvpdzq*6hhzX6V8si1Ye3vpL9X8cajj5JEhzCEqHa2fmWOafi4FiXWw-jdzHaI4V*q66Gp0fwGUUwsQtnUGP38AnwwV0A_'
      })
      .then(() => {
        wx.showLoading({
          title: '登录成功'
        })
        console.log('登陆成功')
        chatStore.data.isLogin = true
        callback && callback()
      })
      .catch(imError => {
        if (imError.code === 2000) {
          wx.showToast({
            title: imError.message + ', 请检查是否正确填写了 SDKAPPID',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: imError.message,
            icon: 'none',
            duration: 1500
          })
        }
      })
  },
  logout: function() {
    tim.logout().then(() => {
      chatStore.data.isLogin = false
      imOperator.reset()
    })
  },
  checkoutConversation: function(context, conversationID) {
    // context.commit('resetCurrentMemberList')
    // 1.切换会话前，将切换前的会话进行已读上报
    // if (context.state.currentConversation.conversationID) {
    //   const prevConversationID = context.state.currentConversation.conversationID
    //   tim.setMessageRead({ conversationID: prevConversationID })
    // }
    // 2.待切换的会话也进行已读上报
    // tim.setMessageRead({ conversationID })
    // 3. 获取会话信息
    return tim.getConversationProfile('GROUP' + conversationID).then(({ data }) => {
      // 3.1 更新当前会话
      console.log('updateCurrentConversation', data.conversation)
      chatStore.data.currentConversation = data.conversation
      // 3.2 获取消息列表
      //   context.dispatch('getMessageList', conversationID)
      // 3.3 拉取第一页群成员列表
      //   if (data.conversation.type === TIM.TYPES.CONV_GROUP) {
      //     return context.dispatch('getGroupMemberList', data.conversation.groupProfile.groupID)
      //   }
      return Promise.resolve()
    })
  }
}
setTimeout(()=>{
  chatStore.data.messages.size(1)
}, 3000)



//  初始化兼听
function initListener(){
  console.log('执行1次')
  console.log('getCurrentPages', getCurrentPages())
  tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
  tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)

  tim.on(TIM.EVENT.KICKED_OUT, event => {
    chatStore.data.isLogin = false
    reset()
    wx.showToast({
      title: '你已被踢下线',
      icon: 'none',
      duration: 1500
    })
    setTimeout(() => {
      wx.clearStorage()
      wx.reLaunch({
        url: '../login/main'
      })
    }, 1500)
  })

  // 出错统一处理
  tim.on(TIM.EVENT.ERROR, event => {
    // 网络错误不弹toast && sdk未初始化完全报错
    console.log('ERROR', event)
    if (event.data.code !== 2800 && event.data.code !== 2999) {
      wx.showToast({
        title: event.data.message,
        icon: 'none',
        duration: 2000
      })
    }
  })

  tim.on(TIM.EVENT.MESSAGE_RECEIVED, event => {
    tim.ready(() => {
      if (event.name === 'onMessageReceived') {
        let id = chatStore.data.currentConversation.conversationID
        if (!id) {
          return
        }
        let list = []
        event.data.forEach(item => {
          if (item.conversationID === id) {
            state.messages = [...state.messages, filterMessage(item)]
          } else {
            // 未读计数 +1
          }
        })
      }
    })
  })
  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
    chatStore.data.conversationList = event.data
  })
  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, event => {
    // store.commit('updateGroupList', event.data)
  })
  tim.on(TIM.EVENT.BLACKLIST_UPDATED, event => {
    // store.commit('updateBlacklist', event.data)
  })

  tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, event => {
    // console.log('system message', event)
  })
}
function onReadyStateUpdate({ name }) {
  console.log('onReadyStateUpdate', name)
  const isSDKReady = (name === TIM.EVENT.SDK_READY)
  chatStore.data.isSDKReady = isSDKReady
}

initListener()

export default imOperator