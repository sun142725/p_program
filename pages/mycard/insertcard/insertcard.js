// pages/mycard/insertcard/insertcard.js
import {
  getTempPathByBase64,
  uploadFile
} from '../../../utils/util'
import {
  insertRecord,
  updateRecord,
  queryRecordById
} from '../../../utils/cloud/mycard.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    friendName: '',
    friendMobile: '',
    ctx: null,
    canvas: null,
    width: 750,
    height: 300,
    history: [],
    drawFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id || undefined
    if(options.id){
      this.getFriendInfo()
    }
  },
  getFriendInfo(id){
    queryRecordById({id: id})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.init()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  init() {
    const query = wx.createSelectorQuery()
    query.select('#autograph')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        this.data.width = canvas.width
        this.data.height = canvas.height
        ctx.scale(dpr, dpr)
        this.data.ctx = ctx
        this.data.canvas = canvas
      })
  },
  handleMousedown(e) {
    let _this = this
    console.log('打印画板 down', e.touches)
    this.lineStart(e.touches[0])
  },
  handleMousemove(e) {
    console.log('打印画板 move', e.touches)
    this.lineMove(e.touches[0])
  },
  handleMouseup(e) {
    console.log('打印画板 up', e.touches)
    this.lineEnd()
  },
  lineStart(data) {
    let _this = this
    this.data.drawFlag = true
    this.data.ctx.clearRect(0, 0, _this.data.width, _this.data.height)
    this.data.ctx.beginPath()
    if (this.data.history.length > 0) {
      this.data.ctx.clearRect(0, 0, this.data.width, this.data.height)
      this.data.ctx.putImageData(this.data.history[this.data.history.length - 1], 0, 0);
    }
    this.data.ctx.moveTo(data.x, data.y);
  },
  lineMove(data) {
    this.data.ctx.lineTo(data.x, data.y)
    this.data.ctx.stroke();
  },
  lineEnd() {
    let _this = this
    this.data.history.push(this.data.ctx.getImageData(0, 0, _this.data.width, _this.data.height));
    console.log(this.data.history.length)
  },
  clearCanvasData() {
    this.data.ctx.clearRect(0, 0, this.data.width, this.data.height)
    this.data.history.push(this.data.ctx.getImageData(0, 0, this.data.width, this.data.height));
  },
  revoke() {
    if (this.data.history.length > 1) {
      this.data.history.pop()
      console.log('this.data.history', this.data.history)
      this.data.ctx.putImageData(this.data.history[this.data.history.length - 1], 0, 0);
    } else if (this.data.history.length <= 1) {
      this.data.ctx.clearRect(0, 0, this.data.width, this.data.height)
      this.data.history = []
    }
  },
  async saveCanvasData() {
    console.log('canvas', this.data)
    const picBase64 = this.data.canvas.toDataURL('toDataURL', 0.92)
    console.log(getTempPathByBase64)
    const tempPath = await getTempPathByBase64(picBase64)
    return await uploadFile('mycard', 'autograph', tempPath)
  },
  async save() {
    if (this.data.history <= 0) {
      this.toast('签名不能为空')
      return
    }
    if (!this.data.friendName) {
      this.toast('姓名不能为空')
      return
    }
    if (!this.data.friendMobile) {
      this.toast('手机号不能为空')
      return
    }
    const imgResult = await this.saveCanvasData()
    const data = {
      friendMobile: this.data.friendMobile,
      friendName: this.data.friendName,
      autographPic: imgResult.fileID
    }
    if (this.data.id) {
      updateRecord({
        id: this.data.id,
        ...data
      }).then(res => {
        console.log('res', res)
      })
    } else {
      insertRecord({
        ...data
      }).then(res => {
        console.log('res', res)
      })
    }
  },
  toast(data) {
    wx.showToast({
      title: data,
      icon: 'none',
      duration: 2000
    })
  },
  handleinput(e) {
    console.log(e)
    const key = e.currentTarget.dataset.key
    const value = e.detail.value
    this.setData({
      [key]: value
    })
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