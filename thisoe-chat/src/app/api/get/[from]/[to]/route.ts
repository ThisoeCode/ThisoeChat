import{NJ}from"@/lib/logsys"
import{auth}from"@/lib/auth"
import{retrieveHistory}from"@/lib/server"
import type{NextRequest}from"next/server"

export const
GET=async(
  _:NextRequest,
  {params}:{params:Promise<{from:string,to:string}>}
)=>{return auth(async(req)=>{if(req.auth?.user){
  return NJ({ok:1,chats:retrieveHistory(params)})
} return NJ({ok:0},401)
})(_,{params:await params})as Promise<Response>}