// pages/consulting/triage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    //  自定义弹窗
    triageStatus: 'success',
    doctorList: [1,2,3]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res)
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  changeTriageStatus: function (event) {
    console.log('点击', event)
    this.setData({
      triageStatus: event.currentTarget.dataset.state
    })
    this.handleInit(this.data.triageStatus)
  },
  // 触发初始化
  handleInit(triageStatus){
    var temporaryState;
    console.log('triageStatus变化处理函数', triageStatus, temporaryState)
    if (temporaryState == triageStatus) { return } else temporaryState = triageStatus
    let _this = this
    switch (triageStatus) {
      case 'triage':
        _this.triageInit();
        break;
      case 'success':
        _this.successInit();
        break;
      case 'fail':
        _this.failInit();
        break;
      case 'talk':
        _this.talkInit();
        break;
    }
  },
  triageInit(){
    console.log('triageInit')
  },
  successInit(){
    console.log('successInit')
  },
  failInit(){
    console.log('failInit')
  },
  talkInit(){
    console.log('talkInit')
  },
  // 返回上一页 重新提交问题
  submitAgain(){
    wx.navigateBack({
      delta: 1
    })
  },
  entryTalkRoom(){
    console.log('进入会话')
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

  },
  observers: {
    'triageStatus': function(state){
      console.log('检测到triageStatus变化', state)
    }
  }
})