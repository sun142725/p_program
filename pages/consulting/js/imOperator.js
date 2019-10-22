console.log('wx.$apptimchat.js', wx.$apptim)
import chatStore from '../../../store/chatStore.js'

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
  timLogin: function (param = {}, callback) {
    console.log('登陆', wx.$apptim)
    wx.showLoading()
    chatStore.data.isLogin = false
    imOperator.reset()
    wx.$apptim.login({
        userID: '18000000002',
      userSig: 'eJxNj1tPgzAYhv*K6a3G9eM02B02kuGGuuwUuGk6WmqHUGTVHYz-fRshi9-l8*Z9vzy-aDGdP7I819*1oebYCDRCGD10WHFRG1Uo0V4g*Lg-q49Z0yhOmaF2y-*1drykXXQtORiD54Ab9KE4NKoVlBWmG7U9fKspeQHJc0riGeGbYht9hVXJtyAX7BRnr4nW2TJ-yz4rkgA3ganJ-dwvZPwRvoeT9T4h6cCMnfXGfxL*ixekx71nu8sJyIjLVRaPI11q2T8zqrqKgjuEIThwU-oR7U7pGo3ukIXBBcvujNHfGXb8Vzc_'
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
    wx.$apptim.logout().then(() => {
      chatStore.data.isLogin = false
      imOperator.reset()
    })
  },
  checkoutConversation: function(context, conversationID) {
    // context.commit('resetCurrentMemberList')
    // 1.切换会话前，将切换前的会话进行已读上报
    // if (context.state.currentConversation.conversationID) {
    //   const prevConversationID = context.state.currentConversation.conversationID
    //   wx.$apptim.setMessageRead({ conversationID: prevConversationID })
    // }
    // 2.待切换的会话也进行已读上报
    // wx.$apptim.setMessageRead({ conversationID })
    // 3. 获取会话信息
    return wx.$apptim.getConversationProfile('GROUP' + conversationID).then(({ data }) => {
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




//  初始化兼听
function initListener(){
  console.log('执行1次')
  console.log('getCurrentPages', getCurrentPages())
  wx.$apptim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
  wx.$apptim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)

  wx.$apptim.on(TIM.EVENT.KICKED_OUT, event => {
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
  wx.$apptim.on(TIM.EVENT.ERROR, event => {
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

  wx.$apptim.on(TIM.EVENT.MESSAGE_RECEIVED, event => {
    wx.$apptim.ready(() => {
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
  wx.$apptim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
    chatStore.data.conversationList = event.data
  })
  wx.$apptim.on(TIM.EVENT.GROUP_LIST_UPDATED, event => {
    // store.commit('updateGroupList', event.data)
  })
  wx.$apptim.on(TIM.EVENT.BLACKLIST_UPDATED, event => {
    // store.commit('updateBlacklist', event.data)
  })

  wx.$apptim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, event => {
    // console.log('system message', event)
  })
}
function onReadyStateUpdate({ name }) {
  console.log('onReadyStateUpdate', name)
  const isSDKReady = (name === TIM.EVENT.SDK_READY)
  chatStore.data.isSDKReady = isSDKReady
}

// initListener()

export default imOperator