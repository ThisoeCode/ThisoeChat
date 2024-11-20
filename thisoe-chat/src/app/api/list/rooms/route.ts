import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/lib/logsys"

export function GET(req:NextRequest){
  return NJ({ping:t.t2,req},201)
}