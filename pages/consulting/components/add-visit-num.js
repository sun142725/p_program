const app = getApp();
Component({
  data: {
    staticSourceServer: app.globalData.staticSourceServer,
    visitNum: ''
  },
  properties: {
    isShowConfirm: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  methods: {
    setValue: function (e) {
      console.log('cancelcancelcancel', e.detail.value)
      this.setData({
        visitNum: e.detail.value
      })
    },
    cancel: function () {
      var that = this
      console.log('cancelcancelcancel')
      that.setData({
        isShowConfirm: false,
        visitNum: ''
      })
    },
    confirmAcceptance: function () {
      var reg = /^[1-9]\d*$/
      if (reg.test(this.data.visitNum) && this.data.visitNum > 0 && this.data.visitNum <= 999) {
        this.triggerEvent('onVisitNum', this.data.visitNum)
        this.setData({ visitNum: ''})
      } else{
        wx.showToast({
          title: '请输入1~999之间的正整数',
          icon: 'none'
        })
        this.setData({ visitNum: '' })
      }
    },
    catchBubbling() {
      // 阻止事件
    }
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

  }
})