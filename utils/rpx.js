function getRpx(px, callback) {
  wx.getSystemInfo({
    success: function (res) {
      var rpx = px * (750 / res.windowWidth)
      console.log(rpx, 'rpxrpxrpxrpxrpxrpx')
      callback && callback(rpx)
      return rpx
    }
  })
}

function getPx(rpx, callback) {
  wx.getSystemInfo({
    success: function (res) {
      var px = rpx / (750 / res.windowWidth)
      console.log(px, 'pxpxpxpxpx')
      callback && callback(rpx)
      return px
    }
  })
}
module.exports = {
  getRpx,
  getPx
}
