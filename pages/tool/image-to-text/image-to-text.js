// pages/tool/image-to-text/image-to-text.js
import request from '../../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageToTextType: {
      general_basic: '通用',
      general: '通用含位置',
      accurate_basic: '高精度',
      accurate: '高精度含位置',
    },
    words: ''
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
  chooseImage(e) {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths[0];
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths, //选择图片返回的相对路径
          encoding: "base64",//这个是很重要的
          success: res => { //成功的回调
            //返回base64格式
            var image = JSON.parse(JSON.stringify(res.data))
            console.log('data:image/png;base64,' + image)
            _this.accurate(image)
          }
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * @param {Base64} image
   * @param {Type} type 
   * https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=4G8D5tqHYA71CN5WaQCtPXxw&client_secret=9iK6E1rlxYvk1Xlepew9RhTqLhFinrQ4
   */
  accurate(image, type = 'accurate_basic'){
    request.Post('https://aip.baidubce.com/rest/2.0/ocr/v1/' + type + '?access_token=24.00d726c07db87b6fef1f8d3dfcaf7d62.2592000.1581144571.282335-17983471',{
      image: image
    })
    .then(res => res.data)
    .then(res => {
      var str = ''
      res.words_result.forEach(val=>{
        str += val.words + '\n'
      })
      console.log()
      this.setData({
        words: str
      })
    })
  },
  setClipboardData(){
    wx.setClipboardData({
      data: this.data.words
    })
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