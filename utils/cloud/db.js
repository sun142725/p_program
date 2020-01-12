wx.cloud.init()
const db = wx.cloud.database()
const tororoCollection = db.collection('tororo')
export {
  tororoCollection
}
export default db