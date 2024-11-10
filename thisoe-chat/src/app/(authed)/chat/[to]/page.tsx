import{session}from"@/lib/lib"
import{Aside,ChatHeader,MainChat}from"@/components/chat"

export default async function _({params}:{params:Promise<{to:string}>}){
  const s = await session()
  return<i id="chat">
    <Aside s={s}/>
    <main>
      <ChatHeader title={'Thisoe Chat!'}/>
      <MainChat s={s} chatWith={(await params).to}/>
    </main>
  </i>
}