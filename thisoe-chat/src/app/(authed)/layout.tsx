import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"
import{Aside}from"@/components/chat"

export default async function _(
  {children}:Readonly<{children:React.ReactNode}>
){
  const session = await auth()
  if(!session)r('/')
  return<i id="chat">
    <Aside session={session}/>
    {children}
  </i>
}