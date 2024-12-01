import{NJ}from"@/lib/logsys"
import{mainDB,userDB}from"@/lib/_insu"
import type{Chat}from"@/lib/ts"

export async function GET(_:Request,{params}:{
  params:Promise<{from:string,to:string}>,
}){
  const
    {from,to}=await params,
    [d1,d2]=(await userDB
      .find({uid:{$in:[from,to]}})
      .project({_id:0,e:1})
      .toArray()
    ), e1=d1.e, e2=d2.e,
    chats = await mainDB.find({$or:[
      { $and:[{ e1 },{ e2 }] },
      { $and: [{ e1:e2 },{ e2:e1 }] }
    ]})
      .project({_id:0})
      .sort({dt:-1})
      .limit(30)
      .toArray() as Chat[]
  return NJ({chats})
}