import{NextRequest}from"next/server"
import{NJ,servTitle as _t}from"@/lib/logsys"

export function GET(req:NextRequest){
  return NJ({ping:_t.t2,req},201)
}