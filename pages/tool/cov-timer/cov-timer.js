// pages/tool/cov-timer/cov-timer.js
import {
  queryCovEndTime
} from '../../../utils/cloud/covRecord'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainTime: null,
    timer: null,
    curCovItem: {
      state: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  init() {
    queryCovEndTime().then(res => {
      this.setData({
        remainTime: res.remainTime,
        curCovItem: res.data || {}
      })
      if (res.remainTime > 0) {
        this.startCount()
      }
      if (res.state !== undefined && res.state !== 0) {
        this.setData({
          showRemainTime: true
        })
      }
      wx.hideLoading()
    })
  },
  startCount() {
    clearTimeout(this.data.timer)
    this.data.timer = setInterval(() => {
      console.log('kkkkkkkk')
      const tempTime = this.data.remainTime - 1000
      this.setData({
        remainTime: tempTime
      })
      if (tempTime <= 0) {
        clearTimeout(this.data.timer)
        this.data.timer = null
      }
    }, 1000)
  },
  addRecord() {
    wx.navigateTo({
      url: '/pages/tool/cov-timer-form/cov-timer-form',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onshow')
    this.init()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearTimeout(this.data.timer)
    this.data.timer = null
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})