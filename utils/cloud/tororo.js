import { tororoCollection } from './db.js'
 export function getTororoList(){
   return tororoCollection.where({name: '123'}).get()
 }

 var a = [{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-taskcard.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-yuyue.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-dragonboat.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-answer.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-card.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-planet.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/saas-fe-titan-hd-giftcard.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/saas-fe-titan-hd-vote.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/saas-fe-titan-hd-recommend.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-message.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/saas-fe-titan-hd-bargain.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-survey.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-facebattle.git",
  branch: 'master'
},
{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/bos-fe-titan-hd-orchard.git",
  branch: 'master'
},{
  type: "git",
  source: "http://stash.weimob.com/WF/hd/saas-fe-titan-lego.git",
  branch: 'master',
  dir: ["packages/lego"],
}]