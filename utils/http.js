

function requestApi(method, url, data, noAuth, header, showLoadBooler) {  //统一请求url
  if (showLoadBooler) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    return new Promise((res, rej) => {
      wx.request({
        url: url,
        method: method,
        data: data,
        header: mergeHeader(noAuth, header),
        success: res=>{
          resolve(res);
          
        },
        fail: err=>{
          wx.showToast({
            title: err.message || '服务器异常',
            icon: 'none',
            duration: 2000
          })
          reject(err)
        },
        complete: ()=>{
          wx.hideLoading()
        }
      })
    })
  })
}

function mergeHeader(noAuth, header) {
  let h = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  if (!noAuth) {
    h.Authorization = wx.getStorageSync('token')
  }
  if (header) {
    for (let k in header) {
      if (header.hasOwnProperty(k)) {
        h[k] = header[k];
      }
    }
  }
  return h;
}


module.exports = {
  /**
   * url--传入接口地址、
   * params--传入参数、
   * noAuth--是否需要Authorization 头信息、
   * headers--添加新的头信息、
   * showLoadBooler--判断这个接口是否需要loading如聊天界面发消息时候就不需要
   * */
  Get: function (url, data = {}, noAuth = false, header, showLoadBooler = true) {
    return requestApi("GET", url, data, noAuth, header, showLoadBooler);
  },
  // POST请求
  Post: function (url, data = {}, noAuth = false, header, showLoadBooler = true) {
    return requestApi("POST", url, data, noAuth, header, showLoadBooler);
  },
  // Put请求
  Put: function (url, data = {}, noAuth = false, header, showLoadBooler = true) {
    return requestApi("PUT", url, data, noAuth, header, showLoadBooler);
  },

  // Delete请求
  Delete: function (url, data = {}, noAuth = false, header, showLoadBooler = true) {
    return requestApi("DELETE", url, data, noAuth, header, showLoadBooler);
  }
}

