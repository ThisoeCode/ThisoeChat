import{SignIn}from"@/components/SignIn"
import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"

export default async function _(){
  const session = await auth()
  if(session)r('/chat')
  return<i id="guestpage">
    <h1>Thisoe Chat!</h1>
    <SignIn className="guest"/>
  </i>
}