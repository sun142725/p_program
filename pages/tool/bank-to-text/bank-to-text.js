// pages/tool/bank-to-text/bank-to-text.js
import request from '../../../utils/http.js'
import { getTororoList } from '../../../utils/cloud/tororo.js'
// import { insert } from '../../../utils/cloud/imageToWordRecord.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backCard: {
      bank_card_number: '',
      valid_date: '',
      bank_card_type: '',
      bank_name: ''
    },
    access_token: '',
    tempFilePath: '',
    fileID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToken()
    getTororoList()
      .then(res => {
        console.log('result调用', res)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getToken() {
    request.Get('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=4G8D5tqHYA71CN5WaQCtPXxw&client_secret=9iK6E1rlxYvk1Xlepew9RhTqLhFinrQ4')
      .then(res => res.data)
      .then(res => {
        this.setData({
          access_token: res.access_token
        })
      })
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
        _this.setData({
          tempFilePath : res.tempFilePaths[0] 
        })
        // _this.uploadFile(tempFilePaths)
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
   * 
   */
  accurate(image, type = 'accurate_basic') {
    request.Post('https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard?access_token=' + this.data.access_token, {
      image: image
    })
      .then(res => res.data)
      .then(res => {
        this.insert({
          words: JSON.stringify(res)
        })
        console.log(res)
        this.setData({
          backCard: {
            bank_card_number: res.result.bank_card_number,
            valid_date: res.result.valid_date,
            bank_card_type: res.result.bank_card_type,
            bank_name: res.result.bank_name
          }
        })
      })
  },
  setClipboardData() {
    if (this.data.backCard.bank_card_number.length <= 0) return;
    wx.setClipboardData({
      data: this.data.backCard.bank_card_number
    })
  },
  uploadFile(filePath) {
    console.log('上传文件')
    let _this = this
    let str = Math.floor(Math.random() * 100000000)
    wx.cloud.uploadFile({
      cloudPath: 'image-to-word/' + str + '.png',
      filePath: filePath,
      success: res => {
        console.log('上传结果', res.fileID)
        _this.data.fileID = res.fileID
      },
      fail: err => {
        console.log('上传失败：', err)
      }
    })
  },
  insert(data) {
    // insert({
    //   fileID: this.data.fileID,
    //   words: data.words
    // }).then(res => {
    //   console.log('插入记录', res)
    // })
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