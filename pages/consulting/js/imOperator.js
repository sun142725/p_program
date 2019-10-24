console.log('wx.$apptimchat.js', wx.$apptim)
import TIM from '../../../utils/tim-wx.js'
import store from '../../../store.js'

const imOperator = {
  initListener: initListener,
  reset: function (){
    Object.assign(store.data, {
      currentUserProfile: {},
      isLogin: false,
      isSDKReady: false, // TIM SDK 是否 ready
      conversationList: [],
      currentConversation: {},
    })
    store.update()
  },
  timLogin: function (param = {}, callback) {
    console.log('登陆', wx.$apptim)
    wx.showLoading()
    store.data.isLogin = false
    imOperator.reset()
    getLoginInfo2({})
      .then(res => {
        // console.log(res)
        let promise = tim.login({
          userID: res.data.userID, userSig: res.data.userSig
        })
        promise.then(function (imResponse) {
          wx.showLoading({
            title: '登录成功'
          })
          store.data.isLogin = true
          store.update()
          callback && callback()
          console.log('imResponse.data', imResponse.data) // 登录成功
        }).catch(function (imError) {
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
          console.warn('login error:', imError) // 登录失败的相关信息
        })
      })
  },
  logout: function() {
    wx.$apptim.logout().then(() => {
      store.data.isLogin = false
      imOperator.reset()
    })
  },
  checkoutConversation: function(conversationID) {
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
      store.data.currentConversation = data.conversation
      store.update()
      // 3.2 获取消息列表
      //   context.dispatch('getMessageList', conversationID)
      // 3.3 拉取第一页群成员列表
      //   if (data.conversation.type === TIM.TYPES.CONV_GROUP) {
      //     return context.dispatch('getGroupMemberList', data.conversation.groupProfile.groupID)
      //   }
      return Promise.resolve()
    })
  },
  addMessage: function (messageList){
    console.log('messageListmessageListmessageList',messageList)
    if (Array.isArray(messageList)){

    } else {
      console.log('store.data.messages', store.data.messages)
      store.data.messages[store.data.messages.length] =imOperator.filterMessage(messageList)
      store.update()
      console.log('store.data.messages', store.data.messages)
    }
    
    setTimeout(() => {
      store.data.scrollTop = store.data.messages.length * 200
      store.update()
    }, 500)
  },
  filterMessage: function (message){
    console.log(message.type == TIM.TYPES.MSG_CUSTOM)
    var obj = {}
    obj.content = message.type == TIM.TYPES.MSG_TEXT ? message.payload.text : message.type == TIM.TYPES.MSG_CUSTOM ? JSON.parse(message.payload.description) : ''
    obj.type = message.type == TIM.TYPES.MSG_TEXT ? 'text' : message.type == TIM.TYPES.MSG_CUSTOM ? message.payload.data : ''
    obj.id = message.type == TIM.TYPES.MSG_TEXT ? message.ID : JSON.parse(message.payload.extension).id
    obj.isSend = message.from == '15100000001'
    obj.time = message.time
    console.log(obj)
    return JSON.parse(JSON.stringify(obj))
  }
}




//  初始化兼听
function initListener(){
  console.log('执行1次')
  console.log('getCurrentPages', getCurrentPages())
  wx.$apptim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
  wx.$apptim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)
  wx.$apptim.on(TIM.EVENT.KICKED_OUT, event => {
    store.data.isLogin = false
    store.update()
    imOperator.reset()
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
        let id = store.data.currentConversation.conversationID
        if (!id) {
          return
        }
        let list = []
        console.log('onMessageReceived', event)
        event.data.forEach(item => {
          if (item.conversationID === id) {
            imOperator.addMessage(item)
            // state.messages = [...state.messages, filterMessage(item)]
          } else {
            // 未读计数 +1
          }
        })
      }
    })
  })
  wx.$apptim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
    console.log('CONVERSATION_LIST_UPDATED', event.data)
    store.data.conversationList = []
    store.data.conversationList.push(...event.data)
    store.update()
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
  store.data.isSDKReady = isSDKReady
  store.update()
}

// initListener()

export default imOperator