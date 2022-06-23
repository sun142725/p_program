// pages/tool/cov-timer/cov-timer.js
import {
  insert,
  queryCovEndTime
} from '../../../utils/cloud/covRecord'
const timeList = [24, 48, 72, 96, 120, 144, 168]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeList: timeList.map(v => {
      return ({
        value: v,
        text: `${v}小时(${Math.floor(v/24)}天)`
      })
    }),
    timeIndex: 2,
    recordTime: '',
    isOpenRemind: true,
    remainTime: null,
    timer: null,
    showRemainTime: false,
    curCovItem: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // wx.login({
    //   success (res) {
    //     if (res.code) {
    //      console.log('code')
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  init() {
    queryCovEndTime().then(res => {
      console.log(res)
      this.setData({
        remainTime: res.remainTime,
        curCovItem: res.data || {}
      })
      if (res.remainTime > 0) {
        this.startCount()
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
  addRecord(){
    this.setData({
      showRemainTime: false
    })
  },
  cacal(){
    this.setData({
      showRemainTime: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  bindDateChange(e) {
    console.log(e.detail.value)
    this.setData({
      recordTime: e.detail.value
    })
  },
  bindSwitchchange(e) {
    this.setData({
      isOpenRemind: e.detail.value
    })
  },
  bindPickerChange(e){
    this.setData({
      timeIndex: e.detail.value
    })
  },
  bindTemplate() {
    console.log('触发授权', {
      recordTime: this.data.recordTime,
      taskTime: this.data.timeList[this.data.timeIndex].value,
      isOpenRemind: this.data.isOpenRemind
    })
wx.showLoading()
    insert({
      recordTime: this.data.recordTime,
      taskTime: this.data.timeList[this.data.timeIndex].value,
      isOpenRemind: this.data.isOpenRemind
    }).then(res => {
      this.init()
    })
    // wx.requestSubscribeMessage({
    //   tmplIds: ["JqkpCqiRGJ4Tl1FFTyPxlNCQ0sx_0teiIT8ZtbgnZqs"],
    //   success: () => {
    //     console.log('用户同意授权')
    //   },
    //   complete: () => {}
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

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