import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/lib/logsys"
import{userDB}from"@/lib/_insu"

export async function PUT(req:NextRequest){t.t1(req)
  const {e,uid,uname,isIDchange}:{
    e:string
    uid:string
    uname:string
    isIDchange:boolean
  } = await req.json()
  console.dir({isIDchange}) // TODO DELETE
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
  if(!e)return NJ({err:'bruh'},500)// TODO DELETE
  const
    set = isIDchange?{$set:{uid,uname}}:{$set:{uname}},
    res = await userDB.updateOne({e},set)
  console.log('```````kkk')
  console.dir(res) // TODO DELETE
  return NJ({ping:'PONG'},201)
}