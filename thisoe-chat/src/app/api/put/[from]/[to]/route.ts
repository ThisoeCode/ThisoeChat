import{auth}from"@/lib/auth"
import{NJ}from"@/lib/logsys"
import{mainDB,userDB}from"@/lib/_insu"
import type{NextRequest}from"next/server"
// import type{NextAuthResult}from"next-auth"
import type{Chat}from"@/lib/ts"

export const PUT=async(
  _:NextRequest,
  context:{params:Promise<{from:string,to:string}>},
)=>{return auth(async(req)=>{if(req.auth?.user){
  const
    {from,to}=await context.params,
    {c} = await req.json(),
    [e1,e2]= // sort (order) by uid
      (await userDB.aggregate([
        {$match: {uid: {$in: [from,to] }}},
        {$addFields: {i: {$indexOfArray: [[from,to],"$uid"] }}},
        {$sort:{i:1}}
      ]).toArray())
      .map(_=>_.e),
    obj:Chat={e1,e2,c,read:false,dt:Math.floor(Date.now())}

  await mainDB.insertOne(obj)

  return NJ({ok:1},201)
} return NJ({ok:0},401)
})(_,context)as Promise<Response>}