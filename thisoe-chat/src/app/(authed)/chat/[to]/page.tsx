import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"
import{Aside,ChatHeader,MainChat}from"@/components/chat"

export default async function _({params}:{params:Promise<{to:string}>}){
  const session = await auth()
  console.log('---------------------------------------------------')
  console.log(session)
  if(!session||!session?.user?.id)r('/')
  return<i id="chat">
    <Aside session={session}/>
    <main>
      <ChatHeader title={'Thisoe Chat!'}/>
      <MainChat session={session} chatWith={(await params).to}/>
    </main>
  </i>
}