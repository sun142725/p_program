// {
      //   "pagePath": "pages/index/index",
      //   "iconPath": "assets/image/icon_home.png",
      //   "selectedIconPath": "assets/image/icon_home_active.png",
      //   "text": "首页"
      // },
      // {
      //   "pagePath": "pages/logs/logs",
      //   "iconPath": "assets/image/icon_colution.png",
      //   "selectedIconPath": "assets/image/icon_clution_active.png",
      //   "text": "启动日志"
      // },
      // {
      //   "pagePath": "pages/mine/mine",
      //   "iconPath": "assets/image/icon_mine.png",
      //   "selectedIconPath": "assets/image/icon_mine_active.png",
      //   "text": "个人中心"
      // }
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('code', res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('res', res)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        //model中包含着设备信息
        console.log('res.model', res)
        var model = res.model
        // if (model.search('iPhone X') != -1) {
        //   app.globalData.isIpx = true;
        // } else {
        //   app.globalData.isIpx = false;
        // }
      }
    })
  },
  globalData: {
    userInfo: null,
    isIpx: false,
    appVesion: 'V1.0.2'
  }
})