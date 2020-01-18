//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World tororo',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swipeArr: [
      {
        id: 0,
        src: '../../assets/image/banner1.jpg'
      },
      {
        id: 1,
        src: '../../assets/image/banner2.jpg'
      },
      {
        id: 2,
        src: '../../assets/image/banner3.jpg'
      },
      {
        id: 3,
        src: '../../assets/image/banner4.jpg'
      },
    ],
    toolArr: [
      {
        image: 'https://cdn.dr-elephant.net/drelephantweb/image/uindex-2.jpg',
        text: '图文转换',
        url: '/pages/tool/image-to-text/image-to-text'
      },
      {
        image: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/29381f30e924b899dddbd6ec60061d950b7bf67b.jpg',
        text: '银行卡识别',
        url: '/pages/tool/bank-to-text/bank-to-text'
      },
      {
        image: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/29381f30e924b899dddbd6ec60061d950b7bf67b.jpg',
        text: '身份证识别',
        url: '/pages/tool/idcard-to-text/idcard-to-text'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../mine/mine'
    })
  },
  // 点击工具区域
  clickTool: function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: this.data.toolArr[index].url
    })
  },
  vibrate: function(){
    wx.vibrateLong({
      success:(res)=>{
        console.log('震动成功',res)
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
