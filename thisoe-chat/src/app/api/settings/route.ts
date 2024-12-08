import{NJ,servTitle as t}from"@/lib/logsys"
import{userDB}from"@/lib/_insu"
import{auth}from"@/lib/auth"

const pro = 'SETTINGAPI'

export const
GET=auth(async(req)=>{if(req.auth?.user){
  const {e,uid,uname,isIDchange}:{
    e:string
    uid:string
    uname:string
    isIDchange:boolean
  } = await req.json()
  // check format
  if(isIDchange){
    if(!/^[a-zA-Z][a-zA-Z0-9_]{0,15}$/.test(uid))
      return NJ({err:'UIDBADFORMAT'},240)
    // check if uid already exists
    if(await userDB.findOne({uid:uid}))
      return NJ({err:'UIDEXIST'},240)
  }
  if(uname.length>99)
    return NJ({err:'NAMETOOLONG'},240)

  // update profile
  if(!e){
    console.error(`[${t.t5+pro} 500] BADAUTHINFO`)
    return NJ({err:'BADAUTHINFO'},500)
  }
  const
    set = isIDchange?{$set:{uid,uname}}:{$set:{uname}},
    res = await userDB.updateOne({e},set)
  if(res.modifiedCount===1)return NJ({},202)
  console.error(`[${t.t5+pro} 500] DBMODIFYFAIL`)
  return NJ({err:'DBMODIFYFAIL'},500)
} return NJ({err:'UNAUTHORIZED'},401)
})