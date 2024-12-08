import{NJ}from"@/lib/logsys"
import{mainDB,userDB}from"@/lib/_insu"
import{auth}from"@/lib/auth"
import type{Chat}from"@/lib/ts"
import type{NextRequest}from"next/server"

export const
GET=(
  _:NextRequest,
  context:{params:Promise<{from:string,to:string}>}
)=>{return auth(async(req)=>{if(req.auth?.user){
  const
    {from,to}=await context.params,
    [d1,d2]=(await userDB
      .find({uid:{$in:[from,to]}})
      .project({_id:0,e:1})
      .toArray()
    ), e1=d1.e, e2=d2.e,
    chats = await mainDB
      .find({$or:[
        {$and:[{ e1 },{ e2 }]},
        {$and:[{ e1:e2 },{ e2:e1 }]}
      ]})
      .project({_id:0})
      .sort({dt:-1})
      .limit(30)
      .toArray() as Chat[]
  return NJ({ok:1,chats})
} return NJ({ok:0},401)
})(_,context)as Promise<Response>}