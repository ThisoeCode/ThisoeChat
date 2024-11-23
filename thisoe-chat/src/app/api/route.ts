import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/lib/logsys"

export function GET(req:NextRequest){
  if(req){return NJ({ping:t.t2},201)}
  return NJ({})
}