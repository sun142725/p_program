// pages/consulting/chat.js
import TIM from '../../utils/tim-wx.js'
import create from '../../utils/create'
import store from '../../store.js'
import imOperator from './js/imOperator.js'
console.log('chat.js')
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    conversationList: [], // 用户所加入的群，判断是否加入该群时需要
    isShowBadge: false, // 是否展示医生详细信息
    textareaHeight: 0,
    message: '',
    groupID: '161302417',
    scrollTop: 99999,
    isShowFn: true, // 底部特殊功能是否展示
    array: [],
    showInput: false,
    showCityPickView: false,
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
      ['messages[' + e.currentTarget.dataset.index + '].content.hasFooter']: false,
      showCityPickView: true
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
  triggleShowFn(){
    this.setData({
      isShowFn: !this.data.isShowFn
    })
  },
  openPicker(){
    var query = wx.createSelectorQuery()
    var pickCity = query.select('.pick-city')
    console.log(pickCity.node())
    pickCity.boundingClientRect(function (rect) {
      console.log(rect)
      let file = '#' + rect.id;
      file.click();
    }).exec()
  },
  submitMsg(e){
    console.log('发送消息', this.data.message)
    this.triggleShowFn()
    this.openPicker()
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
      console.log(v)
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
  chooseImage(e){
    var sourceType = e.currentTarget.dataset.sourcetype
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [sourceType],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0];
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindPickerChange(e){
    console.log('eee', e)
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
    this.update()
    console.log(store)
    store.onChange = function(evn){
      console.log('evn', evn)
      if (evn.isSDKReady){
        _this.searchGroupByID('161302417')
      }
    }
    setTimeout(()=>{
      this.store.data.messages = [
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
        {
          content: {
            subType: 'addmsg', // 二级类型
            isDiagnosis: false, // 是否是诊断记录
            title: '', //  isUserInfo为false 时使用
            subTitle: '男 | 34岁',  // isUserInfo为true 时使用
            template: 'text',
            contentText: '最好是几粒就见效的那种，因为我还有好多原型没画，一忙起来就想不起吃药。谢谢了！',
            contentImages: ['https://uat-gateway.dr-elephant.net/sysfile-oss/sysFile/downloadFile?url=https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/UX/13698078888/20190124/2f1da089c6b5421e905a594f8fa1c637.png', 'https://uat-gateway.dr-elephant.net/sysfile-oss/sysFile/downloadFile?url=https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/UX/13698078888/20190124/2f1da089c6b5421e905a594f8fa1c637.png', 'https://uat-gateway.dr-elephant.net/sysfile-oss/sysFile/downloadFile?url=https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/UX/13698078888/20190124/2f1da089c6b5421e905a594f8fa1c637.png'],
            hasFooter: false,
          },
          id: "GROUP10000000-11-75000159-1",
          isSend: true,
          time: 1571726798,
          type: "custom"
        }
      ]
      this.update()
      console.log(this.store.data.messages)
    }, 3000)
   
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