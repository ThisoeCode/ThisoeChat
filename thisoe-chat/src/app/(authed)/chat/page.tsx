import{auth}from"@/lib/auth"
import{ChatHeader}from"@/components/chat"

export default async function _(){
  const session = await auth()
  return<main>
    <ChatHeader title={'Thisoe Chat!'}/>
    <i>
      {" chatting area "}
      {session?.user?.id}
    </i>
  </main>
}