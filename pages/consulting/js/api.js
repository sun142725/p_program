import requestApi from '../../../utils/http.js'
/**
 * 获取tim登录sig接口
 * @param {* FormData } data - userId
 */
export function getLoginInfo2(data) {
  return requestApi.Get(
    'https://sit-gateway.dr-elephant.net/webrtc/weapp/webrtc_room/get_login_info2',
    {
      userID: data.userID || '15100000001'
    }
  )
}