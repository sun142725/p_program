wx.cloud.init({traceUser:true})
const db = wx.cloud.database()
const tororoCollection = db.collection('tororo')
const mycardCollection = db.collection('mycard')
const covRecord = db.collection('covRecord')
// const imageToWordCollection = db.collection('imageToWordRecord')
export {
  covRecord,
  // mycardCollection
  // imageToWordCollection
}
export default db