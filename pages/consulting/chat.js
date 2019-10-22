// pages/consulting/chat.js
import TIM from '../../utils/tim-wx.js'
import create from '../../utils/create'
import chatStore from '../../store/chatStore.js'
import imOperator from './js/imOperator.js'
console.log('chat.js')
create(chatStore, {
  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    conversationList: [],
    isShowBadge: false,
    textareaHeight: 0,
    message: '',
    groupID: '10000000'
  },
  changeIsShowBadge(){
    let _this = this
    this.setData({
      isShowBadge: !_this.data.isShowBadge
    })
  },
  footClick(e){
    console.log(this)
    // [e.currentTarget.dataset.state]
    console.log('eeeeeeeeeeee', e)
    var changeItem = 'todos[' + e.currentTarget.dataset.index + '].idDelete';  
    this.setData({
      ['messages[' + e.currentTarget.dataset.index + '].content.hasFooter']: false
    })
    console.log(this.data.messages)
  },
  // 换行
  lineChange(e){
    console.log(e.detail)
    if (e.detail.lineCount <= 3){
      this.setData({
        textareaHeight: e.detail.heightRpx
      })
    }
  },
  submitMsg(e){
    console.log('发送消息', this.data.message)
    let _this = this
    let message = wx.$apptim.createTextMessage({
      to: _this.data.groupID,
      conversationType: TIM.TYPES.CONV_GROUP,
      payload: {
        text: _this.data.message
      }
    });
    wx.$apptim.sendMessage(message)
      .then(imResponse => {
        console.log('消息发送成功', imResponse);
        imOperator.addMessage(imResponse.data.message)
        console.log('this.data.messages', this.data.messages)
      })
      .catch(imError => {
        console.warn('sendMessage error:', imError);
      })
  },
  bindinput(e){
    console.log(getCurrentPages())
    this.setData({
      message: e.detail.value
    })
  },
  // 
  //  搜索群组是否存在
  searchGroupByID(groupID) {
    console.log('groupID', groupID)
    let _this = this
    wx.$apptim.searchGroupByID(groupID)
      .then((imResponse) => {
        const group = imResponse.data.group; // 群组信息
        console.log('imResponse群组信息', imResponse)
        _this.joinGroup(groupID)
      })
      .catch((imError) => {
        console.warn('searchGroupByID error:', imError); // 搜素群组失败的相关信息
        _this.createGroup(groupID)
      });
  },
  // 创建并加入群聊
  createGroup(groupID) {
    let _this = this
    wx.$apptim.createGroup({
      groupID: groupID,
      type: TIM.TYPES.GRP_PUBLIC,  //  GRP_PUBLIC
      name: '诊室',
      joinOption: TIM.TYPES.JOIN_OPTIONS_FREE_ACCESS,
      memberList: [{ userID: '18000000002' }]
    })
      .then((imResponse) => {
        const group = imResponse.data.group; // 群组信息
        console.log('createGroup', imResponse)
        imOperator.checkoutConversation(groupID)
      })
      .catch((imError) => {
        console.warn('createGroupByID error:', imError); // 创建群组失败的相关信息
      });
  },
  joinGroup(groupID) {
    let _this = this
    console.log('conversationList', this.data.conversationList, groupID)
    let index = this.data.conversationList.findIndex((v) => {
      return v.type == 'GROUP' && v.groupProfile.groupID == groupID
    })
    console.log(index)
    if (index >= 0) {
      console.log('已加入群')
      imOperator.checkoutConversation(groupID)
      return;
    }
    wx.$apptim.joinGroup({ groupID: groupID, type: TIM.TYPES.GRP_PUBLIC })
      .then(function (imResponse) {
        switch (imResponse.data.status) {
          case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: break; // 等待管理员同意
          case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
            console.log('加群成功', imResponse.data.group); // 加入的群组资料
            imOperator.checkoutConversation(groupID)
            break;
          default: break;
        }
      }).catch(function (imError) {
        console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      
                  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    console.log(chatStore)
    chatStore.onChange = function(evn){
      console.log('evn', evn)
      if (evn.isSDKReady){
        _this.searchGroupByID('10000000')
      }
    }
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})