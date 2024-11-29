import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/lib/logsys"
import type{Chat}from"@/lib/ts"
import { mainDB, userDB } from "@/lib/_insu"

export async function PUT(req:NextRequest,{params}:{params:Promise<{from:string,to:string}>}){
  const
    {from,to}=await params,
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

  return NJ({ping:'Pong!',from,to,t:t.t2},201)
}