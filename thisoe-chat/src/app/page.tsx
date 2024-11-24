import{SignIn}from"@/components/SignIn"
import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"

export default async function _(){
  if(await auth())r('/chat')
  return<i id="guestpage" className="chat-bg">
    <h1>Thisoe Chat!</h1>
    <SignIn className="guest"/>
  </i>
}