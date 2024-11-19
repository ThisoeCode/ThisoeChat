import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/lib/logsys"

export async function GET(req:NextRequest,{params}:{params:Promise<{from:string,to:string}>}){
  const{from,to}=await params
  return NJ({ping:'Pong!',from,to,req,t:t.t2},201)
}