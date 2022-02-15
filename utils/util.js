const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 
 * @param {* string } menu 目录
 * @param {* string } name 
 * @param {* string } filePath 图片临时路径 
 */
export function uploadFile(menu = 'image-to-word', name = 'img', filePath) {
  console.log('上传文件 autograph')
  return new Promise((resolve, reject) => {
    let fileName = name + '_' + new Date().getTime()
    wx.cloud.uploadFile({
      cloudPath: menu + '/' + fileName + '.png',
      filePath: filePath,
      success: res => {
        resolve(res)
      },
      fail: err => {
        console.log('上传失败：', err)
        reject(err)
      }
    })
  })

}

module.exports = {
  formatTime: formatTime
}