import { tororoCollection } from './db.js'
 export function getTororoList(){
   return tororoCollection.where({name: '123'}).get()
 }
