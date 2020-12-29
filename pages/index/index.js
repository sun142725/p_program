var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardsList: {},
    list: [],
    statusBarHeight: getApp().globalData.statusBarHeight,
    scrollHeight: 200,
    windowWidth:0,
    windowHeight:0,
    awardsConfig: {
      count: 50,
      slicePrizes: [
        { text: "恭喜中大奖", img: "/assets/image/camera.png", title: "积分券x1", num: "1200", x: "1" },
        { text: "医疗服务费", img: "/assets/image/camera.png", title: "积分券x1", num: "50", x: "2" },
        { text: "健康保养费", img: "/assets/image/camera.png", title: "积分券x1", num: "500", x: "1" },
        { text: "谢谢参与", img: "/assets/image/camera.png", title: "积分券x3", num: "0", x: "2" },
        { text: "青春补偿费", img: "/assets/image/camera.png", title: "积分券x1", num: "200", x: "1" },
        { text: "感恩奉献费", img: "/assets/image/camera.png", title: "积分券x1", num: "100", x: "2" },
        { text: "咨询售后费", img: "/assets/image/camera.png", title: "积分券x1", num: "150", x: "1" },
        { text: "谢谢参与", img: "/assets/image/camera.png", title: "积分券x1", num: "0", x: "1" },
        { text: "咨询售后费", img: "/assets/image/camera.png", title: "积分券x1", num: "150", x: "1" },
        { text: "谢谢参与", img: "/assets/image/camera.png", title: "积分券x1", num: "0", x: "1" }
      ],
    },
    size: 640
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.initAdards()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          scrollHeight: res.windowHeight - res.windowWidth / 750 * (getApp().globalData.statusBarHeight * 2 + 98),
          size: 600
        });
      },
    })
  },
  onReady: function(e) {
    let that = this,
      fps = 60, awardsConfig = that.data.awardsConfig,
        w = this.data.windowWidth / 750 * 600,
        h = this.data.windowWidth / 750 * 600
   
    
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          contentHeight: res.windowHeight
        });
      },
    })
    that.setData({
      count: awardsConfig.count
    })
    let len = awardsConfig.slicePrizes.length,
        rotateDeg = 360 / len / 2 ,
        list = [],
        turnNum = 1 / len;
    for (var i = 0; i < len; i++) {
      list.push({
        award: awardsConfig.slicePrizes[i].text,
      });
    };
    that.setData({
      list: list.concat(list)
    });
  },
//初始化奖品数据 计算角度
  initAdards() {
    var that = this,
      awardsConfig = that.data.awardsConfig;
    var t = awardsConfig.slicePrizes.length; // 选项长度
    var e = 1 / t,
      i = 360 / t,
      r = i - 90;

    for (var g = 0; g < t; g++) {
      awardsConfig.slicePrizes[g].item2Deg = g * i + 90 - i / 2 + "deg"; //当前下标 * 360/长度 + 90 - 360/长度/2
      awardsConfig.slicePrizes[g].afterDeg = r + "deg";
      awardsConfig.slicePrizes[g].opacity = '1';
    }
    that.setData({
      turnNum: e, // 页面的单位是turn
      awardsConfig: awardsConfig,
    })
  },
  /**
  * 抽奖处理函数：
  */
  getLottery: function () {
    let that = this;
    // 获取奖品配置
    let awardsConfig = that.data.awardsConfig,
      runNum = 12,
      len = awardsConfig.slicePrizes.length,
      awardIndex = 0;
    awardIndex = parseInt(Math.random() * 6)
    console.log("奖品序号：" + awardIndex);
    // 旋转抽奖
    app.runDegs = 0
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / len))
    //创建动画
    let animationRunEasyIn = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in'
    })
    let animationRunLinear = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    let animationRunEasyOut = wx.createAnimation({
      duration: 4000,
      timingFunction: 'linear'
    })
    
    animationRunEasyIn.rotate(360).step()
    that.setData({
      animationData: animationRunEasyIn.export()
    })
    var n = 2
    setInterval(function () {
      // animation.translateY(-60).step()
      animationRunLinear.rotate(360*n).step()
      n++;
      console.log(n);
      this.setData({
        animationData: animationRunLinear.export()
      })
    }.bind(this), 1000)
  },
})