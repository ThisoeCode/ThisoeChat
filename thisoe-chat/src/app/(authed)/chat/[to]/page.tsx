import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"
import{Aside,ChatHeader}from"@/components/chat"
import MainChat from "@/components/MainChat"

export default async function _({params}:{params:Promise<{to:string}>}){
  const session = await auth()
  if(!session||!session?.user?.id)r('/')
  return<i id="chat">
    <Aside session={session}/>
    <main>
      <ChatHeader title={'Thisoe Chat!'}/>
      <MainChat uid={session?.user.id} chatWith={(await params).to}/>
    </main>
  </i>
}