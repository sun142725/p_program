

function getApi(methoded, url, params, noAuth, header) {
  return new Promise((res, rej) => {
    wx.request({
      url: url,
      method: methoded,
      data: params,
      header: mergeHeader(noAuth, header),
      success: res,
      fail: rej
    })
  })
}

function requestApi(method, url, data, noAuth, headers, showLoadBooler) {  //统一请求url
  if (showLoadBooler) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  }
  if (!wx.getStorageSync('token')) {
    showOutLogin()
  }
  return new Promise((resolve, reject) => {

    getApi(method, url, data, noAuth, headers).then(res => {
      wx.hideLoading()
      if (res.data.code === 0 || res.data.operationState === 'SUCCESS') {
        resolve(res);
      } else {
        // 更新失败后的错误提示信息
        let parm = ''
        if (res.data.errors && res.data.errors.length) {
          if (res.data.errors.toString().includes('JWT expired at')) {
            wx.showToast({
              title: res.data.msg || '登录超时，请重新登录',
              icon: "none"
            });
            wx.removeStorageSync('token');
            wx.removeStorageSync('user.phoneNumber');
            wx.removeStorageSync('user.password');
            wx.reLaunch({
              url: '../login_user/login_user',
            })
          } else {
            parm = res.data.errors && res.data.errors.length ? res.data.errors.toString() : ''
          }
        } else if (res.data.error && res.data.error.length) {
          parm = res.data.error && res.data.error.length ? res.data.error.toString() : ''
        } else {
          parm = res.data.msg && res.data.msg.length ? res.data.msg.toString() : ''
        }

        let currentRoute = wx.getStorageSync('currentRoute')
        //token 拦截
        //非主页，当前页非登录页，当前页是注册页
        if (!res.data.errors ||
          (currentRoute && currentRoute == 'pages/login_user/login_user') ||
          (res.data.errors && !wx.getStorageSync('token') && currentRoute != 'pages/login_user/login_user')) { //

          wx.showToast({
            title: parm || res.data.message,
            icon: 'none',
            duration: 2000
          })
        } else {
          showOutLogin()
        }
        // reject(res)
      }

    }).catch(err => {

      if (err.message || err.errMsg) {
        wx.showToast({
          title: err.message || err.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
      // reject(err)
    })
  })
}



function mergeHeader(noAuth, headers) {
  let h = {
    'Content-Type': 'application/json'
  };
  if (!noAuth) {
    h.Authorization = wx.getStorageSync('token')
  }
  if (headers) {
    for (let k in headers) {
      if (headers.hasOwnProperty(k)) {
        h[k] = headers[k];
      }
    }
  }
  return h;
}
function showOutLogin() {

  let self = this;
  let token = wx.getStorageSync('token') //当前路由
  if (token) {
    wx.showModal({
      title: '提醒',
      showCancel: false,
      content: '登录状态过期，请重新登录。',
      confirmText: '确定',
      success() {
        wx.removeStorageSync('token');
        wx.removeStorageSync('user.phoneNumber');
        wx.removeStorageSync('user.password');

        wx.redirectTo({
          url: '../login_user/login_user',
        })
      }
    })
  }
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

