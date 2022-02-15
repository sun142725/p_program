wx.cloud.init()
const db = wx.cloud.database()
const tororoCollection = db.collection('tororo')
const mycardCollection = db.collection('mycard')
// const imageToWordCollection = db.collection('imageToWordRecord')
export {
  tororoCollection,
  mycardCollection
  // imageToWordCollection
}
export default db