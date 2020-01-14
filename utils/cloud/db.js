wx.cloud.init()
const db = wx.cloud.database()
const tororoCollection = db.collection('tororo')
const imageToWordCollection = db.collection('imageToWordRecord')
export {
  tororoCollection,
  imageToWordCollection
}
export default db