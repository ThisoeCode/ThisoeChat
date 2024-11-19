import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/lib/logsys"

export function GET(req:NextRequest){t.t1(req)
  const pro = 'SIGNIN'
  // check if email exists
    // no: add new profile
  // return profile, limit _id
  return NJ({ping:pro},201)
}