// pages/tool/cov-timer/cov-timer.js
import {
  insert,
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
    isOpenRemind: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
  bindPickerChange(e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },
  bindTemplate() {
    if (!this.data.isOpenRemind) {
      this.insertRecord(3)
      return
    }
    console.log('触发授权', {
      recordTime: this.data.recordTime,
      taskTime: this.data.timeList[this.data.timeIndex].value,
      isOpenRemind: this.data.isOpenRemind
    })
    wx.requestSubscribeMessage({
      tmplIds: ["oNLCnRDriuzA-YURfJgBQuxvf2lr8JiJYowyzDBkwGw"],
      success: () => {
        console.log('用户同意授权')
        this.insertRecord()
      },
      fail: () => {
        this.insertRecord(2)
      }
    })
  },
  insertRecord(sendState) {
    wx.showLoading()
    insert({
      recordTime: this.data.recordTime,
      taskTime: this.data.timeList[this.data.timeIndex].value,
      isOpenRemind: this.data.isOpenRemind,
      sendState: sendState || undefined
    }).then(res => {
      wx.hideLoading()
      wx.navigateBack()
    })
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